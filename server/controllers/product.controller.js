import { PrismaClient } from '@prisma/client';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, status } = req.body;
    let imageUrl = null;
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        if (cloudinaryResponse) {
          images.push(cloudinaryResponse.url);
        }
      }
      if (images.length > 0) {
        imageUrl = images[0];
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10) || 0,
        status: status || "Active",
        imageUrl,
        images,
        categoryId: parseInt(categoryId, 10),
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, status } = req.body;
    let imageUrl = undefined;
    let images = undefined;

    if (req.files && req.files.length > 0) {
      images = [];
      for (const file of req.files) {
        const cloudinaryResponse = await uploadOnCloudinary(file.path);
        if (cloudinaryResponse) {
          images.push(cloudinaryResponse.url);
        }
      }
      if (images.length > 0) {
        imageUrl = images[0];
      }
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(stock && { stock: parseInt(stock, 10) }),
        ...(status && { status }),
        ...(categoryId && { categoryId: parseInt(categoryId, 10) }),
        ...(imageUrl && { imageUrl }),
        ...(images && { images }),
      },
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id, 10) } });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
