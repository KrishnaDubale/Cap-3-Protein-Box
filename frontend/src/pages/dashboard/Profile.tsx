import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, ShoppingBag, Crown, Calendar, Clock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { OrderHistory } from './profile/OrderHistory';

export const Profile = () => {
    const navigate = useNavigate();
    const [membership, setMembership] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [memRes, userRes] = await Promise.all([
                    fetch('http://localhost:3000/api/membership/status', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('http://localhost:3000/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                if (memRes.ok) setMembership(await memRes.json());
                if (userRes.ok) setUser(await userRes.json());
            } catch (error) {
                console.error('Failed to fetch profile data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{user?.name}</h1>
                    <p className="text-muted-foreground">{user?.email}</p>
                </div>
            </div>

            <Tabs defaultValue="membership" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="membership">Membership</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Overview</CardTitle>
                            <CardDescription>Manage your account details and preferences.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Profile overview content goes here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="orders">
                    <OrderHistory />
                </TabsContent>

                <TabsContent value="membership">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-none shadow-card bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Crown className="h-5 w-5 text-green-600" />
                                    Current Plan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-green-700">{membership?.plan?.name || 'Free Plan'}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {membership?.status === 'Active' ? 'Active Subscription' : 'No Active Subscription'}
                                        </p>
                                    </div>
                                    <Badge variant={membership?.status === 'Active' ? 'default' : 'secondary'} className="text-lg px-4 py-1">
                                        {membership?.status || 'Inactive'}
                                    </Badge>
                                </div>

                                {membership?.status === 'Active' && (
                                    <div className="space-y-2 pt-4 border-t">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <Calendar className="h-4 w-4" /> Start Date
                                            </span>
                                            <span className="font-medium">{new Date(membership.start).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <Clock className="h-4 w-4" /> Expires On
                                            </span>
                                            <span className="font-medium">{new Date(membership.end).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Days Remaining</span>
                                            <span className="font-bold text-green-600">{membership.daysLeft} Days</span>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6">
                                    {membership?.status === 'Active' ? (
                                        membership.daysLeft < 5 ? (
                                            <Button onClick={() => navigate('/dashboard/membership')} className="w-full bg-orange-500 hover:bg-orange-600">
                                                Renew Membership
                                            </Button>
                                        ) : (
                                            <Button onClick={() => navigate('/dashboard/membership')} variant="outline" className="w-full">
                                                Upgrade Plan
                                            </Button>
                                        )
                                    ) : (
                                        <Button onClick={() => navigate('/dashboard/membership')} className="w-full bg-green-600 hover:bg-green-700">
                                            View Plans
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Plan Benefits</CardTitle>
                                <CardDescription>What's included in your current plan</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {membership?.plan?.benefits?.map((benefit: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            <span>{benefit}</span>
                                        </li>
                                    )) || (
                                            <li className="text-muted-foreground">No active benefits. Subscribe to unlock features!</li>
                                        )}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                            <CardDescription>Manage your app settings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" onClick={() => navigate('/dashboard/settings')}>Go to Full Settings</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
