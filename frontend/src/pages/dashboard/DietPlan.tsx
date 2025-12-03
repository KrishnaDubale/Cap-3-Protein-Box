import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    TrendingUp,
    Utensils,
    Zap,
    Info,
    CheckCircle2,
    ArrowRight,
    Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
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
    Cell
} from 'recharts';
import { getMyOrders } from '@/services/orderService';
import { useNavigate } from 'react-router-dom';

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
    items: OrderItem[];
}

interface WeeklyStats {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number; // Mocked as we don't store carbs/fats in DB yet, will estimate
    totalFats: number; // Mocked as we don't store carbs/fats in DB yet, will estimate
    avgDailyCalories: number;
    avgDailyProtein: number;
}

const COLORS = ['#27AE60', '#2ECC71', '#3498DB', '#F1C40F'];

export const DietPlan = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<WeeklyStats>({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        avgDailyCalories: 0,
        avgDailyProtein: 0
    });
    const [eatingPattern, setEatingPattern] = useState('Balanced');
    const [weeklyChartData, setWeeklyChartData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
                calculateStats(data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const calculateStats = (ordersData: Order[]) => {
        // Filter for last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentOrders = ordersData.filter(order => new Date(order.createdAt) >= oneWeekAgo);

        let totalCals = 0;
        let totalProt = 0;
        let totalItems = 0;

        // Group by day for chart
        const dailyData: Record<string, { calories: number, protein: number }> = {};
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Initialize last 7 days
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dayName = days[d.getDay()];
            dailyData[dayName] = { calories: 0, protein: 0 };
        }

        recentOrders.forEach(order => {
            const dayName = days[new Date(order.createdAt).getDay()];

            order.items.forEach(item => {
                const cals = (item.calories || 0) * item.quantity;
                const prot = (item.protein || 0) * item.quantity;

                totalCals += cals;
                totalProt += prot;
                totalItems += item.quantity;

                if (dailyData[dayName]) {
                    dailyData[dayName].calories += cals;
                    dailyData[dayName].protein += prot;
                }
            });
        });

        // Estimate Carbs/Fats (since not in DB schema yet, using standard ratios for demo)
        // Protein * 4 + Carbs * 4 + Fats * 9 = Calories
        // We know Protein and Calories. Let's assume remaining is split 50/50 cal-wise between carbs/fats for estimation
        const remainingCals = totalCals - (totalProt * 4);
        const estimatedCarbs = Math.max(0, Math.round((remainingCals * 0.6) / 4)); // 60% of remainder to carbs
        const estimatedFats = Math.max(0, Math.round((remainingCals * 0.4) / 9));  // 40% of remainder to fats

        const avgCals = totalItems > 0 ? Math.round(totalCals / 7) : 0; // Avg per day over 7 days
        const avgProt = totalItems > 0 ? Math.round(totalProt / 7) : 0;

        setStats({
            totalCalories: totalCals,
            totalProtein: totalProt,
            totalCarbs: estimatedCarbs,
            totalFats: estimatedFats,
            avgDailyCalories: avgCals,
            avgDailyProtein: avgProt
        });

        // Determine Pattern
        if (avgProt > 150 && avgCals > 2500) setEatingPattern('Bulking Pattern');
        else if (avgCals < 1800) setEatingPattern('Cutting Pattern');
        else setEatingPattern('Balanced Pattern');

        // Chart Data
        const chartData = Object.keys(dailyData).map(day => ({
            name: day,
            calories: dailyData[day].calories,
            protein: dailyData[day].protein
        }));
        setWeeklyChartData(chartData);
    };

    if (loading) return <div className="p-8 space-y-4"><Skeleton className="h-48 w-full" /><Skeleton className="h-96 w-full" /></div>;

    const macroData = [
        { name: 'Protein', value: stats.totalProtein * 4 },
        { name: 'Carbs', value: stats.totalCarbs * 4 },
        { name: 'Fats', value: stats.totalFats * 9 },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Your Personal Diet Plan</h1>
                <p className="text-muted-foreground">Insights and recommendations based on your actual eating habits.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="border-none shadow-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Weekly Calories</CardTitle>
                            <Activity className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCalories.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Total calories consumed this week</p>
                            <Progress value={Math.min((stats.totalCalories / 14000) * 100, 100)} className="h-2 mt-3" />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="border-none shadow-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Daily Protein</CardTitle>
                            <Zap className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.avgDailyProtein}g</div>
                            <p className="text-xs text-muted-foreground">Average daily protein intake</p>
                            <Progress value={Math.min((stats.avgDailyProtein / 150) * 100, 100)} className="h-2 mt-3 bg-blue-100" indicatorClassName="bg-blue-500" />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="border-none shadow-card h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Eating Pattern</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{eatingPattern}</div>
                            <p className="text-xs text-muted-foreground">Based on your recent orders</p>
                            <div className="mt-3 flex gap-1">
                                <Badge variant="secondary" className="text-[10px]">{stats.avgDailyCalories > 2000 ? 'High Cal' : 'Mod Cal'}</Badge>
                                <Badge variant="secondary" className="text-[10px]">{stats.avgDailyProtein > 100 ? 'High Prot' : 'Mod Prot'}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card className="border-none shadow-card h-full bg-primary/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recommendation</CardTitle>
                            <Info className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm font-medium mb-2">
                                {stats.avgDailyProtein < 100
                                    ? "Try increasing your protein intake."
                                    : "Great job hitting protein goals!"}
                            </div>
                            <Button size="sm" className="w-full" onClick={() => navigate('/dashboard/meals')}>
                                View High Protein Meals
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Charts */}
                <Card className="md:col-span-2 border-none shadow-card">
                    <CardHeader>
                        <CardTitle>Weekly Nutrition Breakdown</CardTitle>
                        <CardDescription>Calories and Protein intake over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyChartData}>
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
                <Card className="border-none shadow-card">
                    <CardHeader>
                        <CardTitle>Macro Distribution</CardTitle>
                        <CardDescription>Caloric contribution by macro</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full relative">
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
                                    <span className="text-2xl font-bold">{stats.totalCalories}</span>
                                    <p className="text-xs text-muted-foreground">Total Cals</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#27AE60]" />
                                    <span>Protein</span>
                                </div>
                                <span className="font-bold">{Math.round((stats.totalProtein * 4 / (stats.totalCalories || 1)) * 100)}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#2ECC71]" />
                                    <span>Carbs (Est)</span>
                                </div>
                                <span className="font-bold">{Math.round((stats.totalCarbs * 4 / (stats.totalCalories || 1)) * 100)}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#3498DB]" />
                                    <span>Fats (Est)</span>
                                </div>
                                <span className="font-bold">{Math.round((stats.totalFats * 9 / (stats.totalCalories || 1)) * 100)}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Insights */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-secondary/20 border-none">
                    <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <p className="font-medium">Protein Intake</p>
                            <p className="text-sm text-muted-foreground">
                                You consume an average of <span className="font-bold text-foreground">{stats.avgDailyProtein}g</span> protein per day.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/20 border-none">
                    <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <p className="font-medium">Calorie Pattern</p>
                            <p className="text-sm text-muted-foreground">
                                Your calorie intake pattern aligns with a <span className="font-bold text-foreground">{eatingPattern}</span>.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/20 border-none">
                    <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <p className="font-medium">Meal Frequency</p>
                            <p className="text-sm text-muted-foreground">
                                You ordered <span className="font-bold text-foreground">{orders.length} meals</span> this week.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Meal History Snapshot */}
            <Card className="border-none shadow-card">
                <CardHeader>
                    <CardTitle>Meal History Snapshot</CardTitle>
                    <CardDescription>Meals used to calculate your nutrition profile</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                            {orders.flatMap(order => order.items.map((item, idx) => (
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
                                    No meal history found. Start ordering to see your stats!
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};
