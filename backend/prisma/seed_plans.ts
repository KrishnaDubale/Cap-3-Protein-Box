import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const plans = [
        {
            name: 'Basic',
            price: 499,
            durationDays: 30,
            benefits: ['5% discount on meals', 'Standard delivery'],
        },
        {
            name: 'Pro',
            price: 999,
            durationDays: 30,
            benefits: ['10% discount', 'Free delivery over ₹500', 'AI personalized diet plan'],
        },
        {
            name: 'Elite',
            price: 1499,
            durationDays: 30,
            benefits: ['20% discount', 'Unlimited free delivery', 'Priority support', 'Exclusive meals'],
        },
    ];

    for (const plan of plans) {
        const existing = await prisma.membershipPlan.findFirst({
            where: { name: plan.name },
        });

        if (!existing) {
            await prisma.membershipPlan.create({
                data: plan,
            });
            console.log(`Created plan: ${plan.name}`);
        } else {
            console.log(`Plan already exists: ${plan.name}`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
