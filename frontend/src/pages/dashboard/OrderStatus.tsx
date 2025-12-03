import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle2,
    ChefHat,
    Truck,
    Package,
    Clock,
    MapPin,
    Phone,
    Star,
    RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactConfetti from 'react-confetti';
import { cn } from '@/lib/utils';

const STAGES = [
    {
        id: 1,
        title: 'Order Placed',
        subtitle: 'We have received your order',
        icon: Package,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
    },
    {
        id: 2,
        title: 'Preparing Meal',
        subtitle: 'Our chefs are cooking',
        icon: ChefHat,
        color: 'text-orange-500',
        bgColor: 'bg-orange-100',
    },
    {
        id: 3,
        title: 'Out for Delivery',
        subtitle: 'On the way to you',
        icon: Truck,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
    },
    {
        id: 4,
        title: 'Delivered',
        subtitle: 'Enjoy your meal!',
        icon: CheckCircle2,
        color: 'text-green-500',
        bgColor: 'bg-green-100',
    }
];

const TOTAL_TIME_SECONDS = 25 * 60; // 25 minutes

export const OrderStatus = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
    const [currentStage, setCurrentStage] = useState(1);
    const [rating, setRating] = useState(0);
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

    useEffect(() => {
        if (timeLeft <= 0) {
            setCurrentStage(4);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // Update stage based on time left
        // 25-20 min: Placed (Stage 1)
        // 20-10 min: Preparing (Stage 2)
        // 10-0 min: Out for Delivery (Stage 3)
        // 0 min: Delivered (Stage 4)

        const minutesLeft = timeLeft / 60;
        if (minutesLeft > 20) setCurrentStage(1);
        else if (minutesLeft > 10) setCurrentStage(2);
        else if (minutesLeft > 0) setCurrentStage(3);
        else setCurrentStage(4);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressValue = () => {
        // Calculate progress percentage based on time elapsed
        const elapsed = TOTAL_TIME_SECONDS - timeLeft;
        return Math.min(100, (elapsed / TOTAL_TIME_SECONDS) * 100);
    };

    const isDelivered = currentStage === 4;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            {isDelivered && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Order #849231</h1>
                        <p className="text-muted-foreground text-sm">
                            Placed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                {!isDelivered && (
                    <Card className="bg-primary/5 border-primary/20 shadow-sm">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary animate-pulse" />
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Estimated Delivery</p>
                                <p className="text-xl font-bold text-primary font-mono">{formatTime(timeLeft)}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Tracker Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Stepper */}
                    <Card className="border-none shadow-card overflow-hidden">
                        <CardHeader className="bg-secondary/20 pb-8">
                            <div className="flex justify-between items-center">
                                <CardTitle>Order Status</CardTitle>
                                <Badge variant={isDelivered ? "default" : "secondary"} className={cn("uppercase", isDelivered && "bg-green-500 hover:bg-green-600")}>
                                    {STAGES[currentStage - 1].title}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <div className="relative">
                                {/* Progress Bar Background */}
                                <div className="absolute left-8 top-8 bottom-8 w-1 bg-muted md:left-0 md:right-0 md:top-8 md:bottom-auto md:h-1 md:w-full -z-10" />

                                {/* Active Progress Bar */}
                                <div
                                    className="absolute left-8 top-8 w-1 bg-primary transition-all duration-1000 md:left-0 md:top-8 md:h-1"
                                    style={{
                                        height: windowSize.width < 768 ? `${((currentStage - 1) / 3) * 100}%` : '4px',
                                        width: windowSize.width >= 768 ? `${((currentStage - 1) / 3) * 100}%` : '4px',
                                        bottom: windowSize.width < 768 ? 'auto' : undefined
                                    }}
                                />

                                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
                                    {STAGES.map((stage, index) => {
                                        const isActive = stage.id === currentStage;
                                        const isCompleted = stage.id < currentStage;
                                        const isUpcoming = stage.id > currentStage;

                                        return (
                                            <div key={stage.id} className="flex md:flex-col items-center gap-4 md:gap-4 md:text-center relative z-10">
                                                <div
                                                    className={cn(
                                                        "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 bg-background",
                                                        isActive ? `border-primary ${stage.color} shadow-lg scale-110` :
                                                            isCompleted ? "border-primary bg-primary text-primary-foreground" :
                                                                "border-muted text-muted-foreground"
                                                    )}
                                                >
                                                    <stage.icon className={cn("h-8 w-8", isActive && "animate-pulse")} />
                                                </div>
                                                <div className="flex-1 md:flex-none">
                                                    <h3 className={cn("font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                                                        {stage.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground hidden md:block max-w-[120px] mx-auto">
                                                        {stage.subtitle}
                                                    </p>
                                                    {/* Mobile subtitle */}
                                                    <p className="text-sm text-muted-foreground md:hidden">
                                                        {stage.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Partner (Only show if Out for Delivery or Delivered) */}
                    {currentStage >= 3 && (
                        <Card className="border-none shadow-card animate-in slide-in-from-bottom-4 duration-700">
                            <CardContent className="p-6 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                                        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" />
                                        <AvatarFallback>DK</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">David Kumar</h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                            4.8 • MH 02 AB 1234
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                                    <Phone className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Delivered Success Screen */}
                    {isDelivered && (
                        <Card className="border-none shadow-card bg-green-50/50 border-green-100 animate-in zoom-in-95 duration-500">
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-green-800">Order Delivered!</h2>
                                    <p className="text-green-700">How was your experience?</p>
                                </div>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={cn(
                                                    "h-8 w-8 transition-colors",
                                                    rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <Button className="w-full max-w-xs" onClick={() => navigate('/dashboard/meals')}>
                                    <RefreshCw className="mr-2 h-4 w-4" /> Order Again
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-card h-fit sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Mock Items */}
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 rounded-md bg-secondary/50 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100" alt="Meal" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">High-Protein Quinoa Bowl</p>
                                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                                    </div>
                                    <p className="font-medium text-sm">₹350</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 rounded-md bg-secondary/50 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=100" alt="Meal" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">Chicken Avocado Salad</p>
                                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                                    </div>
                                    <p className="font-medium text-sm">₹380</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹730</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span>₹50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Taxes</span>
                                    <span>₹36.50</span>
                                </div>
                                <div className="flex justify-between font-bold text-base pt-2">
                                    <span>Total</span>
                                    <span className="text-primary">₹816.50</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Delivery Address</p>
                                    <div className="flex gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <p>Flat 101, Green Apts, Main Street, Mumbai - 400001</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Payment Method</p>
                                    <div className="flex gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                        <p>UPI (Google Pay)</p>
                                    </div>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full">
                                Need Help?
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
