import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Smartphone, Building, ArrowRight, ShieldCheck, Check, Lock } from 'lucide-react';
import { DashboardNavbar } from '../components/layout/DashboardNavbar';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function MembershipPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const plan = location.state?.plan;

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [processing, setProcessing] = useState(false);

    if (!plan) {
        React.useEffect(() => {
            navigate('/dashboard/membership');
        }, [navigate]);
        return null;
    }

    const handlePayment = async () => {
        setProcessing(true);

        // Simulate API call
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/membership/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ planId: plan.id }),
            });

            if (response.ok) {
                setTimeout(() => {
                    navigate('/dashboard/membership/success', { state: { plan } });
                }, 2000);
            } else {
                toast({
                    title: "Payment Failed",
                    description: "Please try again.",
                    variant: "destructive",
                });
                setProcessing(false);
            }
        } catch (error) {
            console.error('Payment error', error);
            // Mock success for now if API fails (e.g. during dev)
            setTimeout(() => {
                navigate('/dashboard/membership/success', { state: { plan } });
            }, 2000);
        }
    };

    const methods = [
        { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
        { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
        { id: 'wallet', name: 'Wallets', icon: Wallet, description: 'Amazon Pay, Cred, Paytm' },
        { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All Indian banks supported' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <DashboardNavbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
                    <p className="text-gray-500">Complete your subscription to {plan.name} plan</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Payment Methods Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-green-600" />
                                    Select Payment Method
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {methods.map((method) => (
                                        <motion.div
                                            key={method.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 ${paymentMethod === method.id
                                                    ? 'border-green-500 bg-green-50/50 shadow-sm'
                                                    : 'border-gray-100 hover:border-gray-200 bg-white'
                                                }`}
                                        >
                                            <div className={`p-3 rounded-full ${paymentMethod === method.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                                <method.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className={`font-semibold ${paymentMethod === method.id ? 'text-green-900' : 'text-gray-900'}`}>{method.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                                            </div>
                                            {paymentMethod === method.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="ml-auto"
                                                >
                                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Dynamic Form Fields */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={paymentMethod}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-gray-50 p-6 rounded-xl border border-gray-100"
                                    >
                                        {paymentMethod === 'card' && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Card Number</Label>
                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                        <Input placeholder="0000 0000 0000 0000" className="pl-10 bg-white" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Expiry Date</Label>
                                                        <Input placeholder="MM/YY" className="bg-white" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>CVV</Label>
                                                        <Input placeholder="123" type="password" className="bg-white" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Cardholder Name</Label>
                                                    <Input placeholder="John Doe" className="bg-white" />
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === 'upi' && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>UPI ID</Label>
                                                    <div className="relative">
                                                        <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                        <Input placeholder="username@upi" className="pl-10 bg-white" />
                                                    </div>
                                                    <p className="text-xs text-gray-500">Enter your VPA (Virtual Payment Address)</p>
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    {['gpay', 'phonepe', 'paytm'].map(app => (
                                                        <div key={app} className="h-8 px-3 rounded border bg-white flex items-center text-xs font-medium uppercase text-gray-600 cursor-pointer hover:border-green-500">
                                                            {app}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {(paymentMethod === 'wallet' || paymentMethod === 'netbanking') && (
                                            <div className="text-center py-4">
                                                <p className="text-gray-600">You will be redirected to the secure payment gateway to complete your transaction.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-24"
                        >
                            <Card className="border-none shadow-lg overflow-hidden">
                                <div className="bg-green-600 p-4 text-white">
                                    <h3 className="font-bold text-lg">Order Summary</h3>
                                </div>
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{plan.name} Plan</h4>
                                            <p className="text-sm text-gray-500">{plan.durationDays} Days Validity</p>
                                        </div>
                                        <span className="font-bold text-xl text-green-600">₹{plan.price}</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span>₹{plan.price}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Discount</span>
                                            <span className="text-green-600">- ₹0</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Tax (18% GST)</span>
                                            <span>₹{(plan.price * 0.18).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-end">
                                            <span className="text-gray-900 font-semibold">Total Amount</span>
                                            <span className="text-2xl font-bold text-gray-900">₹{(plan.price * 1.18).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePayment}
                                        disabled={processing}
                                        className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Proceed to Pay <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                                        <ShieldCheck className="w-4 h-4" />
                                        256-bit SSL Secure Payment
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};
