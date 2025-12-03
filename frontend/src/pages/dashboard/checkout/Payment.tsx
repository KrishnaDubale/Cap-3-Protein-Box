import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { createOrder } from '@/services/orderService';
import { useToast } from '@/hooks/use-toast';

export const Payment = () => {
    const navigate = useNavigate();
    const { cartTotal, clearCart, items } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();

    const deliveryFee = 50;
    const taxes = cartTotal * 0.05;
    const finalTotal = cartTotal + deliveryFee + taxes;

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const order = await createOrder({
                items,
                totalAmount: finalTotal,
                deliveryAddress: 'Flat 101, Green Apts, Main Street, Mumbai - 400001', // Should come from address context/state
                paymentMethod,
            });

            clearCart();
            navigate(`/dashboard/checkout/success?orderId=${order.id}`);
        } catch (error) {
            toast({
                title: "Payment Failed",
                description: "There was an error processing your payment. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/checkout/address')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                    <div className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-2">
                        <span className="text-primary">Cart</span>
                        <span className="text-primary">Address</span>
                        <span className="text-primary">Payment</span>
                        <span>Success</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary transition-all duration-500" />
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                                <div>
                                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                                    <Label
                                        htmlFor="upi"
                                        className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Wallet className="h-6 w-6 text-primary" />
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">UPI</p>
                                                <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                                            </div>
                                        </div>
                                    </Label>
                                    {paymentMethod === 'upi' && (
                                        <div className="mt-4 pl-4 border-l-2 border-primary/20 animate-in slide-in-from-top-2">
                                            <Label htmlFor="upiId">UPI ID</Label>
                                            <Input id="upiId" placeholder="username@upi" className="mt-1.5 max-w-sm" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                    <Label
                                        htmlFor="card"
                                        className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <CreditCard className="h-6 w-6 text-primary" />
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Credit / Debit Card</p>
                                                <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                                            </div>
                                        </div>
                                    </Label>
                                    {paymentMethod === 'card' && (
                                        <div className="mt-4 pl-4 border-l-2 border-primary/20 animate-in slide-in-from-top-2 space-y-4 max-w-sm">
                                            <div className="space-y-2">
                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="expiry">Expiry</Label>
                                                    <Input id="expiry" placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" placeholder="123" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                                    <Label
                                        htmlFor="cod"
                                        className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Banknote className="h-6 w-6 text-primary" />
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Cash on Delivery</p>
                                                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                                            </div>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24 border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                                    <span>Total Amount</span>
                                    <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-secondary/30 p-3 rounded-lg text-xs text-muted-foreground">
                                <p className="font-medium mb-1">Delivering to:</p>
                                <p>John Doe, Flat 101, Green Apts, Main Street, Mumbai - 400001</p>
                                <Button variant="link" className="h-auto p-0 text-xs text-primary" onClick={() => navigate('/dashboard/checkout/address')}>
                                    Change
                                </Button>
                            </div>

                            <Button
                                className="w-full h-12 text-base group"
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Proceed to Pay
                                        <CheckCircle2 className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
