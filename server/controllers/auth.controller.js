import prisma from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await prisma.admin.findUnique({ where: { id: adminId } });
        
        const accessToken = jwt.sign(
            { id: admin.id, email: admin.email, name: admin.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            { id: admin.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        await prisma.admin.update({
            where: { id: admin.id },
            data: { refreshToken }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedAdmin = await prisma.admin.findUnique({ where: { email } });

    if (existedAdmin) {
        throw new ApiError(409, "Admin with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    if (!admin) {
        throw new ApiError(500, "Something went wrong while registering the admin");
    }

    return res.status(201).json(
        new ApiResponse(201, admin, "Admin registered successfully")
    );
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "email and password are required");
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
        throw new ApiError(404, "Admin does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin.id);

    const loggedInAdmin = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt
    };

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, 
                { admin: loggedInAdmin, accessToken, refreshToken }, 
                "Admin logged in successfully"
            )
        );
});

export { registerAdmin, loginAdmin };
