import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Zap, Crown, ShieldCheck, Activity, Utensils } from 'lucide-react';
import { DashboardNavbar } from '../../components/layout/DashboardNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const PlanDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const plan = location.state?.plan;

    if (!plan) {
        React.useEffect(() => {
            navigate('/dashboard/membership');
        }, [navigate]);
        return null;
    }

    const getPlanIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'basic': return <Star className="w-12 h-12 text-green-500" />;
            case 'pro': return <Zap className="w-12 h-12 text-blue-500" />;
            case 'elite': return <Crown className="w-12 h-12 text-yellow-500" />;
            default: return <Star className="w-12 h-12" />;
        }
    };

    const getGradient = (name: string) => {
        switch (name.toLowerCase()) {
            case 'basic': return 'from-green-50 to-white border-green-200';
            case 'pro': return 'from-blue-50 to-white border-blue-200';
            case 'elite': return 'from-yellow-50 to-white border-yellow-200';
            default: return 'from-gray-50 to-white border-gray-200';
        }
    };

    const allBenefits = [
        { name: 'Discount on meals', basic: '5%', pro: '10%', elite: '20%' },
        { name: 'Delivery Fee', basic: 'Standard', pro: 'Free > ₹500', elite: 'Unlimited Free' },
        { name: 'Diet Plan', basic: false, pro: 'AI Personalized', elite: 'AI + Nutritionist' },
        { name: 'Support', basic: 'Standard', pro: 'Priority', elite: 'Dedicated Agent' },
        { name: 'Exclusive Meals', basic: false, pro: false, elite: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <DashboardNavbar />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Plan Overview</h1>
                    <p className="text-xl text-gray-600">Review the benefits of the <span className="font-bold text-green-600">{plan.name}</span> plan before subscribing.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Plan Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Plan Card */}
                        <Card className={`border-2 shadow-lg bg-gradient-to-br ${getGradient(plan.name)}`}>
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{plan.name} Plan</h2>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                                            <span className="text-gray-500">/ {plan.durationDays} days</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                                        {getPlanIcon(plan.name)}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-green-600" />
                                        What's Included
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {plan.benefits.map((benefit: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + (i * 0.1) }}
                                                className="flex items-start p-3 bg-white/60 rounded-xl border border-gray-100"
                                            >
                                                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700 font-medium">{benefit}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comparison Table */}
                        <Card className="border-none shadow-card">
                            <CardContent className="p-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <Utensils className="w-5 h-5 text-green-600" />
                                    Plan Comparison
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg">Feature</th>
                                                <th className="px-4 py-3">Basic</th>
                                                <th className="px-4 py-3">Pro</th>
                                                <th className="px-4 py-3 rounded-r-lg">Elite</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allBenefits.map((item, i) => (
                                                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-4 py-4 font-medium text-gray-900">{item.name}</td>
                                                    <td className={`px-4 py-4 ${plan.name === 'Basic' ? 'font-bold text-green-600' : 'text-gray-600'}`}>
                                                        {typeof item.basic === 'boolean' ? (item.basic ? <Check className="w-4 h-4" /> : '-') : item.basic}
                                                    </td>
                                                    <td className={`px-4 py-4 ${plan.name === 'Pro' ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                                                        {typeof item.pro === 'boolean' ? (item.pro ? <Check className="w-4 h-4" /> : '-') : item.pro}
                                                    </td>
                                                    <td className={`px-4 py-4 ${plan.name === 'Elite' ? 'font-bold text-yellow-600' : 'text-gray-600'}`}>
                                                        {typeof item.elite === 'boolean' ? (item.elite ? <Check className="w-4 h-4" /> : '-') : item.elite}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Sidebar CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-none shadow-lg overflow-hidden">
                                <div className="h-2 bg-green-500 w-full" />
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                                            <span className="text-sm text-gray-500">/ month</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <ShieldCheck className="w-4 h-4 text-green-500" />
                                            Secure Payment
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-green-500" />
                                            Cancel Anytime
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Zap className="w-4 h-4 text-green-500" />
                                            Instant Activation
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => navigate('/dashboard/membership/payment', { state: { plan } })}
                                        className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all hover:-translate-y-1"
                                    >
                                        Continue to Payment <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
