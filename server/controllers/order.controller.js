import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerName, email, address, totalAmount, items } = req.body;
    
    // In a real app we'd also save the order items, but for now we'll 
    // just store the order and the customer details as requested in the schema
    const order = await prisma.order.create({
      data: {
        customerName,
        totalAmount: parseFloat(totalAmount),
        status: 'Pending',
      },
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
