import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// Create a new order
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const userId = (req as any).user.userId;
        const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;

        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                status: 'Placed',
                deliveryAddress,
                paymentMethod,
                items: {
                    create: items.map((item: any) => ({
                        mealName: item.title,
                        mealImage: item.image,
                        quantity: item.quantity,
                        price: item.price,
                        calories: item.calories,
                        protein: item.protein,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get all orders for the logged-in user
router.get('/my-orders', authenticateToken, async (req, res) => {
    try {
        const userId = (req as any).user.userId;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get a single order by ID
router.get('/:orderId', authenticateToken, async (req, res) => {
    try {
        const userId = (req as any).user.userId;
        const { orderId } = req.params;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access to this order' });
        }

        res.json(order);
    } catch (error) {
        console.error('Get order details error:', error);
        res.status(500).json({ error: 'Failed to fetch order details' });
    }
});

export default router;
