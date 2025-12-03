import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, LayoutDashboard, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MembershipSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state?.plan;

    useEffect(() => {
        // Fire confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="max-w-md w-full"
            >
                <Card className="border-none shadow-2xl overflow-hidden">
                    <div className="bg-green-600 h-2 w-full" />
                    <div className="p-10 text-center space-y-8">

                        <div className="flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center relative"
                            >
                                <motion.div
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <CheckCircle className="w-16 h-16 text-green-600" />
                                </motion.div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                                    className="absolute inset-0 rounded-full border-4 border-green-200 opacity-50"
                                />
                            </motion.div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900">Your subscription is active!</h1>
                            <p className="text-gray-600 text-lg">
                                You are now subscribed to the <span className="font-bold text-green-600">{plan?.name || 'Premium'}</span> plan.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <Button
                                onClick={() => navigate('/dashboard')}
                                className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all"
                            >
                                <LayoutDashboard className="mr-2 w-5 h-5" />
                                Go to Dashboard
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => navigate('/dashboard/profile')}
                                className="w-full h-12 text-lg font-semibold border-2 hover:bg-gray-50 text-gray-700"
                            >
                                <FileText className="mr-2 w-5 h-5" />
                                View Membership Details
                            </Button>
                        </div>

                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default MembershipSuccess;
