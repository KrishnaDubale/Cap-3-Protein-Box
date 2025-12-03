import React from 'react';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const deliveryFee = 50;
    const taxes = cartTotal * 0.05; // 5% tax
    const finalTotal = cartTotal + deliveryFee + taxes;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trash2 className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-muted-foreground">Looks like you haven't added any meals yet.</p>
                <Button onClick={() => navigate('/dashboard/meals')} className="mt-4">
                    Browse Meals
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Your Cart</h2>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
                            <CardContent className="p-0 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-24 w-24 object-cover"
                                />
                                <div className="flex-1 py-4">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {item.calories} kcal • {item.protein}g Protein
                                    </p>
                                    <div className="mt-2 font-bold text-primary">
                                        ₹{item.price}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pr-4">
                                    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-md"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-md"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24 border-none shadow-card">
                        <CardContent className="p-6 space-y-6">
                            <h3 className="font-semibold text-lg">Order Summary</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Delivery Fee</span>
                                    <span>₹{deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Taxes (5%)</span>
                                    <span>₹{taxes.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 text-base group"
                                onClick={() => navigate('/dashboard/checkout/address')}
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
