import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ReactConfetti from 'react-confetti';

export const OrderSuccess = () => {
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId') || '---';
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
            <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.2}
            />

            <Card className="max-w-md w-full border-none shadow-2xl relative z-10 animate-in zoom-in-95 duration-500">
                <CardContent className="pt-12 pb-8 px-8 text-center space-y-6">
                    <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-700 delay-200">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Check className="h-8 w-8 text-white stroke-[3]" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Order Placed!</h2>
                        <p className="text-muted-foreground">
                            Thank you for your order. We've sent a confirmation email to your inbox.
                        </p>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Order ID</span>
                            <span className="font-mono font-medium">#{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Delivery</span>
                            <span className="font-medium">
                                {deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            className="w-full h-11 text-base"
                            onClick={() => navigate('/dashboard/orders')}
                        >
                            View Order Status
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-11"
                            onClick={() => navigate('/dashboard/meals')}
                        >
                            Continue Browsing
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
