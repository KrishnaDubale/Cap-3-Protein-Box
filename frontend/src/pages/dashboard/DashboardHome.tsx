import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Utensils,
    Flame,
    TrendingUp,
    Download,
    Calendar,
    ArrowRight,
    DollarSign,
    ShoppingBag,
    Crown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import { getMyOrders } from '@/services/orderService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useToast } from '@/hooks/use-toast';

// Types
interface OrderItem {
    id: string;
    mealName: string;
    mealImage: string;
    quantity: number;
    calories: number;
    protein: number;
    price: number;
}

interface Order {
    id: string;
    createdAt: string;
    totalAmount: number;
    items: OrderItem[];
}

interface DashboardStats {
    totalCalories: number;
    avgDailyProtein: number;
    weeklyMealCount: number;
    mostFrequentType: string;
    totalSpent: number;
}

const COLORS = ['#27AE60', '#2ECC71', '#3498DB', '#F1C40F'];

export const DashboardHome = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [generatingReport, setGeneratingReport] = useState(false);
    const [stats, setStats] = useState<DashboardStats>({
        totalCalories: 0,
        avgDailyProtein: 0,
        weeklyMealCount: 0,
        mostFrequentType: 'Balanced',
        totalSpent: 0
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const [macroData, setMacroData] = useState<any[]>([]);
    const [membership, setMembership] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [ordersData, membershipRes] = await Promise.all([
                    getMyOrders(),
                    fetch('http://localhost:3000/api/membership/status', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setOrders(ordersData);
                calculateStats(ordersData);

                if (membershipRes.ok) {
                    const memData = await membershipRes.json();
                    setMembership(memData);
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const calculateStats = (ordersData: Order[]) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentOrders = ordersData.filter(order => new Date(order.createdAt) >= oneWeekAgo);

        let totalCals = 0;
        let totalProt = 0;
        let totalItems = 0;
        let totalSpent = 0;
        let totalCarbsEst = 0;
        let totalFatsEst = 0;

        const dailyData: Record<string, { calories: number, protein: number, count: number }> = {};
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Initialize last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dayName = days[d.getDay()];
            dailyData[dayName] = { calories: 0, protein: 0, count: 0 };
        }

        recentOrders.forEach(order => {
            const dayName = days[new Date(order.createdAt).getDay()];
            totalSpent += order.totalAmount;

            order.items.forEach(item => {
                const cals = (item.calories || 0) * item.quantity;
                const prot = (item.protein || 0) * item.quantity;

                totalCals += cals;
                totalProt += prot;
                totalItems += item.quantity;

                // Estimate Carbs/Fats
                const remainingCals = cals - (prot * 4);
                totalCarbsEst += Math.max(0, Math.round((remainingCals * 0.6) / 4));
                totalFatsEst += Math.max(0, Math.round((remainingCals * 0.4) / 9));

                if (dailyData[dayName]) {
                    dailyData[dayName].calories += cals;
                    dailyData[dayName].protein += prot;
                    dailyData[dayName].count += item.quantity;
                }
            });
        });

        const avgProt = totalItems > 0 ? Math.round(totalProt / 7) : 0;

        // Determine most frequent type based on macros
        let type = 'Balanced';
        if (avgProt > 150) type = 'High Protein';
        else if (totalCals / 7 < 1800 && totalItems > 0) type = 'Low Calorie';
        else if (totalFatsEst > totalCarbsEst) type = 'Keto Friendly';

        setStats({
            totalCalories: totalCals,
            avgDailyProtein: avgProt,
            weeklyMealCount: totalItems,
            mostFrequentType: type,
            totalSpent: totalSpent
        });

        setChartData(Object.keys(dailyData).map(day => ({
            name: day,
            calories: dailyData[day].calories,
            protein: dailyData[day].protein,
            count: dailyData[day].count
        })));

        setMacroData([
            { name: 'Protein', value: totalProt * 4 },
            { name: 'Carbs', value: totalCarbsEst * 4 },
            { name: 'Fats', value: totalFatsEst * 9 },
        ]);
    };

    const generateReport = () => {
        setGeneratingReport(true);
        try {
            const doc = new jsPDF();

            // Header
            doc.setFillColor(39, 174, 96); // Green primary
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.text('FitEats Weekly Report', 20, 25);

            doc.setFontSize(12);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);

            // Summary Stats
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text('Weekly Summary', 20, 55);

            const summaryData = [
                ['Total Calories', `${stats.totalCalories} kcal`],
                ['Avg Daily Protein', `${stats.avgDailyProtein}g`],
                ['Meals Ordered', `${stats.weeklyMealCount}`],
                ['Total Spent', `₹${stats.totalSpent.toFixed(2)}`],
                ['Eating Pattern', stats.mostFrequentType]
            ];

            autoTable(doc, {
                startY: 60,
                head: [['Metric', 'Value']],
                body: summaryData,
                theme: 'striped',
                headStyles: { fillColor: [39, 174, 96] }
            });

            // Detailed Meal List
            doc.text('Detailed Meal History (Last 7 Days)', 20, (doc as any).lastAutoTable.finalY + 15);

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const recentOrders = orders.filter(order => new Date(order.createdAt) >= oneWeekAgo);

            const mealRows: any[] = [];
            recentOrders.forEach(order => {
                order.items.forEach(item => {
                    mealRows.push([
                        new Date(order.createdAt).toLocaleDateString(),
                        item.mealName,
                        item.quantity,
                        `${item.calories} kcal`,
                        `${item.protein}g`,
                        `₹${item.price}`
                    ]);
                });
            });

            autoTable(doc, {
                startY: (doc as any).lastAutoTable.finalY + 20,
                head: [['Date', 'Meal', 'Qty', 'Calories', 'Protein', 'Price']],
                body: mealRows,
                theme: 'grid',
                headStyles: { fillColor: [46, 204, 113] }
            });

            doc.save('fiteats-weekly-report.pdf');

            toast({
                title: "Report Downloaded",
                description: "Your weekly nutrition report has been generated successfully.",
                className: "bg-green-50 border-green-200"
            });
        } catch (error) {
            console.error('PDF Generation Error:', error);
            toast({
                title: "Download Failed",
                description: "There was an error generating your report.",
                variant: "destructive"
            });
        } finally {
            setGeneratingReport(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 p-8">
                <Skeleton className="h-12 w-64" />
                <div className="grid gap-6 md:grid-cols-4">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's your weekly health overview.</p>
                </div>
                <Button
                    onClick={generateReport}
                    disabled={generatingReport || stats.weeklyMealCount === 0}
                    className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                >
                    {generatingReport ? (
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                        <Download className="mr-2 h-4 w-4" />
                    )}
                    Download Weekly Report
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="border-none shadow-card hover:shadow-hover transition-all bg-gradient-to-br from-green-50 to-white border-l-4 border-l-green-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Membership Status</CardTitle>
                            <Crown className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-700">{membership?.plan?.name || 'Free'}</div>
                            <p className="text-xs text-muted-foreground">
                                {membership?.status === 'Active'
                                    ? `${membership.daysLeft} days remaining`
                                    : 'Upgrade to Premium'}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="border-none shadow-card hover:shadow-hover transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Weekly Calories</CardTitle>
                            <Flame className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCalories.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Total calories consumed</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="border-none shadow-card hover:shadow-hover transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Daily Protein</CardTitle>
                            <Utensils className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.avgDailyProtein}g</div>
                            <p className="text-xs text-muted-foreground">Average daily intake</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="border-none shadow-card hover:shadow-hover transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{stats.totalSpent.toFixed(0)}</div>
                            <p className="text-xs text-muted-foreground">Spent this week</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Empty State */}
            {stats.weeklyMealCount === 0 && (
                <Card className="border-dashed border-2 bg-secondary/10">
                    <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No orders this week</h3>
                        <p className="text-muted-foreground mb-4">Start ordering healthy meals to see your stats!</p>
                        <Button onClick={() => navigate('/dashboard/meals')}>Browse Meals</Button>
                    </CardContent>
                </Card>
            )}

            {/* Charts Section */}
            {stats.weeklyMealCount > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Weekly Calories & Protein */}
                    <Card className="lg:col-span-4 border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Weekly Nutrition</CardTitle>
                            <CardDescription>Calories and Protein intake over the last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" axisLine={false} tickLine={false} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar yAxisId="left" dataKey="calories" fill="#27AE60" radius={[4, 4, 0, 0]} name="Calories" />
                                        <Bar yAxisId="right" dataKey="protein" fill="#3498DB" radius={[4, 4, 0, 0]} name="Protein (g)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Macro Distribution */}
                    <Card className="lg:col-span-3 border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Macro Distribution</CardTitle>
                            <CardDescription>Caloric contribution by macro</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={macroData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {macroData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center">
                                        <span className="text-2xl font-bold">{stats.mostFrequentType}</span>
                                        <p className="text-xs text-muted-foreground">Pattern</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Recent Meals */}
            <Card className="border-none shadow-card">
                <CardHeader>
                    <CardTitle>Recent Meals Ordered</CardTitle>
                    <CardDescription>Your latest healthy choices</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                            {orders.slice(0, 10).flatMap(order => order.items.map((item, idx) => (
                                <div key={`${order.id}-${idx}`} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                                            <img src={item.mealImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'} alt={item.mealName} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.mealName}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm">{item.calories} kcal</p>
                                        <p className="text-xs text-primary">{item.protein}g Protein</p>
                                    </div>
                                </div>
                            )))}
                            {orders.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    No recent orders found.
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};
