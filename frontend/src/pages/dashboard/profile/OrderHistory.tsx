import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMyOrders } from '@/services/orderService';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface Order {
    id: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: {
        id: string;
        mealName: string;
        mealImage: string;
        quantity: number;
    }[];
}

export const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'placed': return 'bg-gray-100 text-gray-800';
            case 'preparing': return 'bg-blue-100 text-blue-800';
            case 'out for delivery': return 'bg-orange-100 text-orange-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Order History</h2>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] gap-4 text-center">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <Package className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">No orders yet</h3>
                    <p className="text-muted-foreground">Start ordering delicious meals to see them here!</p>
                    <Button onClick={() => navigate('/dashboard/meals')}>
                        Browse Meals
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            className="overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-300 group cursor-pointer"
                            onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                        >
                            <CardHeader className="bg-secondary/20 pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-1">Order ID</p>
                                        <p className="font-mono text-sm font-bold">#{order.id.slice(0, 8)}</p>
                                    </div>
                                    <Badge className={cn("capitalize shadow-none", getStatusColor(order.status))}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                    <span className="mx-1">•</span>
                                    <Clock className="h-4 w-4" />
                                    <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>

                                <div className="flex gap-2 py-2">
                                    {order.items.slice(0, 3).map((item) => (
                                        <div key={item.id} className="relative h-12 w-12 rounded-md overflow-hidden bg-secondary">
                                            <img src={item.mealImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'} alt={item.mealName} className="h-full w-full object-cover" />
                                            {item.quantity > 1 && (
                                                <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1">
                                                    x{item.quantity}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Total Amount</p>
                                        <p className="font-bold text-primary">₹{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
