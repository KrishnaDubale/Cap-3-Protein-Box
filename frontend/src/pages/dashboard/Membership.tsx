import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { DashboardNavbar } from '../../components/layout/DashboardNavbar';

interface Plan {
    id: string;
    name: string;
    price: number;
    durationDays: number;
    benefits: string[];
}

export const Membership = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/api/membership/plans', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPlans(data);
                } else {
                    console.error('Failed to fetch plans');
                }
            } catch (error) {
                console.error('Failed to fetch plans', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const getPlanIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'basic': return <Star className="w-8 h-8 text-green-500" />;
            case 'pro': return <Zap className="w-8 h-8 text-blue-500" />;
            case 'elite': return <Crown className="w-8 h-8 text-yellow-500" />;
            default: return <Star className="w-8 h-8" />;
        }
    };

    const getPlanColor = (name: string) => {
        switch (name.toLowerCase()) {
            case 'basic': return 'border-green-200 hover:border-green-500 shadow-green-100';
            case 'pro': return 'border-blue-200 hover:border-blue-500 shadow-blue-100';
            case 'elite': return 'border-yellow-200 hover:border-yellow-500 shadow-yellow-100';
            default: return 'border-gray-200 hover:border-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-gray-600">Unlock exclusive benefits and elevate your fitness journey.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 shadow-lg ${getPlanColor(plan.name)}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{plan.durationDays} Days</p>
                                    </div>
                                    {getPlanIcon(plan.name)}
                                </div>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                                    <span className="text-gray-500">/month</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => navigate('/dashboard/membership/details', { state: { plan } })}
                                    className="w-full py-3 px-6 rounded-xl bg-gray-900 text-white font-semibold hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    Subscribe Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// End of file
