import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Package, ChefHat, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getOrderDetails } from '@/services/orderService';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderDetail {
    id: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    deliveryAddress: string;
    paymentMethod: string;
    items: {
        id: string;
        mealName: string;
        mealImage: string;
        quantity: number;
        price: number;
        calories: number;
        protein: number;
    }[];
}

const STAGES = [
    { id: 'Placed', label: 'Order Placed', icon: Package },
    { id: 'Preparing', label: 'Preparing', icon: ChefHat },
    { id: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
    { id: 'Delivered', label: 'Delivered', icon: CheckCircle2 },
];

export const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            getOrderDetails(orderId)
                .then(setOrder)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [orderId]);

    if (loading) return <div className="p-8"><Skeleton className="h-96 w-full" /></div>;
    if (!order) return <div className="p-8">Order not found</div>;

    const currentStageIndex = STAGES.findIndex(s => s.id.toLowerCase() === order.status.toLowerCase());
    const isDelivered = order.status === 'Delivered';

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/orders')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Details</h1>
                    <p className="text-muted-foreground text-sm">#{order.id}</p>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Tracker */}
                    <Card className="border-none shadow-card">
                        <CardContent className="p-8">
                            <div className="relative flex justify-between">
                                <div className="absolute left-0 top-5 w-full h-1 bg-muted -z-10" />
                                <div
                                    className="absolute left-0 top-5 h-1 bg-primary transition-all duration-500 -z-10"
                                    style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
                                />
                                {STAGES.map((stage, index) => {
                                    const isCompleted = index <= currentStageIndex;
                                    const isActive = index === currentStageIndex;
                                    return (
                                        <div key={stage.id} className="flex flex-col items-center gap-2 bg-background px-2">
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                                                isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-muted text-muted-foreground",
                                                isActive && "ring-4 ring-primary/20"
                                            )}>
                                                <stage.icon className="h-5 w-5" />
                                            </div>
                                            <span className={cn("text-xs font-medium", isCompleted ? "text-foreground" : "text-muted-foreground")}>
                                                {stage.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Items List */}
                    <Card className="border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Items</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-20 w-20 rounded-lg bg-secondary/50 overflow-hidden shrink-0">
                                        <img src={item.mealImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'} alt={item.mealName} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{item.mealName}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.calories} kcal • {item.protein}g Protein
                                                </p>
                                            </div>
                                            <p className="font-bold">₹{item.price}</p>
                                        </div>
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            Qty: {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{(order.totalAmount / 1.05 - 50).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span>₹50.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Taxes</span>
                                    <span>₹{(order.totalAmount - (order.totalAmount / 1.05)).toFixed(2)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">₹{order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Delivery Address</p>
                                    <div className="flex gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <p>{order.deliveryAddress}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Payment Method</p>
                                    <div className="flex gap-2 text-sm">
                                        <CreditCard className="h-4 w-4 text-primary shrink-0" />
                                        <p className="capitalize">{order.paymentMethod}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
