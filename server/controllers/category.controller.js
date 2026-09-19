import { PrismaClient } from '@prisma/client';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const prisma = new PrismaClient();

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl = null;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(
    req.file.buffer,
    req.file.originalname
);
      if (cloudinaryResponse) {
        imageUrl = cloudinaryResponse.url;
      }
    }

    const category = await prisma.category.create({
      data: { name, description, imageUrl },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let imageUrl = undefined;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(
    req.file.buffer,
    req.file.originalname
);
      if (cloudinaryResponse) {
        imageUrl = cloudinaryResponse.url;
      }
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
      },
    });

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: parseInt(id, 10) } });
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
