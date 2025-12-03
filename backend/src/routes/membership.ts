import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Get all membership plans
router.get('/plans', async (req: Request, res: Response) => {
    try {
        const plans = await prisma.membershipPlan.findMany({
            orderBy: { price: 'asc' },
        });
        res.json(plans);
    } catch (error) {
        console.error('Get plans error:', error);
        res.status(500).json({ message: 'Failed to fetch plans' });
    }
});

// Subscribe to a plan
router.post('/subscribe', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const { planId } = req.body;

        console.log('Subscribe request received for planId:', planId);

        if (!planId) {
            console.log('Plan ID missing in request body');
            res.status(400).json({ message: 'Plan ID is required' });
            return;
        }

        const plan = await prisma.membershipPlan.findUnique({
            where: { id: planId },
        });

        if (!plan) {
            console.log('Plan not found in DB for ID:', planId);
            res.status(404).json({ message: 'Plan not found' });
            return;
        }

        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(now.getDate() + plan.durationDays);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                membershipPlanId: planId,
                membershipStart: now,
                membershipEnd: endDate,
            },
            include: {
                membershipPlan: true,
            },
        });

        res.json({
            message: 'Subscription successful',
            membership: {
                plan: updatedUser.membershipPlan,
                start: updatedUser.membershipStart,
                end: updatedUser.membershipEnd,
            },
        });
    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({ message: 'Failed to subscribe' });
    }
});

// Get membership status
router.get('/status', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { membershipPlan: true },
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        let status = 'Inactive';
        let daysLeft = 0;

        if (user.membershipEnd && new Date(user.membershipEnd) > new Date()) {
            status = 'Active';
            const diffTime = Math.abs(new Date(user.membershipEnd).getTime() - new Date().getTime());
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        } else if (user.membershipEnd) {
            status = 'Expired';
        }

        res.json({
            plan: user.membershipPlan,
            status,
            daysLeft,
            start: user.membershipStart,
            end: user.membershipEnd,
        });
    } catch (error) {
        console.error('Get status error:', error);
        res.status(500).json({ message: 'Failed to fetch status' });
    }
});

export default router;
