import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Address = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard/checkout/payment');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/cart')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                    <div className="flex items-center justify-between text-sm font-medium text-muted-foreground mb-2">
                        <span className="text-primary">Cart</span>
                        <span className="text-primary">Address</span>
                        <span>Payment</span>
                        <span>Success</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-primary transition-all duration-500" />
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Delivery Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="John Doe" required className="focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+91 98765 43210" required className="focus-visible:ring-primary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" required className="focus-visible:ring-primary" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="houseNo">House No. / Apartment</Label>
                                <Input id="houseNo" placeholder="Flat 101, Green Apts" required className="focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="street">Street / Area</Label>
                                <Input id="street" placeholder="Main Street, Sector 4" required className="focus-visible:ring-primary" />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Mumbai" required className="focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" placeholder="Maharashtra" required className="focus-visible:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input id="pincode" placeholder="400001" required className="focus-visible:ring-primary" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                            <Textarea
                                id="instructions"
                                placeholder="Leave at door, call upon arrival, etc."
                                className="focus-visible:ring-primary resize-none"
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-base group">
                            Continue to Payment
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
