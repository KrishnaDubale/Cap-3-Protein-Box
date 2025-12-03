import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const CALORIE_DATA = [
    { day: 'Mon', calories: 2100, goal: 2400 },
    { day: 'Tue', calories: 2300, goal: 2400 },
    { day: 'Wed', calories: 2250, goal: 2400 },
    { day: 'Thu', calories: 2450, goal: 2400 },
    { day: 'Fri', calories: 2150, goal: 2400 },
    { day: 'Sat', calories: 2600, goal: 2400 },
    { day: 'Sun', calories: 2350, goal: 2400 },
];

const WEIGHT_DATA = [
    { week: 'W1', weight: 82.5 },
    { week: 'W2', weight: 81.8 },
    { week: 'W3', weight: 81.2 },
    { week: 'W4', weight: 80.5 },
    { week: 'W5', weight: 80.1 },
    { week: 'W6', weight: 79.5 },
];

export const ProgressTracker = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Progress Tracker</h2>
                <p className="text-muted-foreground">Track your fitness journey and body metrics.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-none shadow-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Current Weight</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">79.5 kg</div>
                        <p className="text-xs text-green-500 font-medium mt-1">-3.0 kg total loss</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Daily Calories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,314 kcal</div>
                        <p className="text-xs text-green-500 font-medium mt-1">Within target range</p>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Workout Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 Days</div>
                        <p className="text-xs text-blue-500 font-medium mt-1">Keep it up!</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="calories" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="calories">Calories</TabsTrigger>
                    <TabsTrigger value="weight">Weight Trend</TabsTrigger>
                </TabsList>

                <TabsContent value="calories" className="space-y-4">
                    <Card className="border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Calorie Intake History</CardTitle>
                            <CardDescription>Daily calorie consumption vs goal.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={CALORIE_DATA}>
                                        <defs>
                                            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#27AE60" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#27AE60" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="calories"
                                            stroke="#27AE60"
                                            fillOpacity={1}
                                            fill="url(#colorCalories)"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="goal"
                                            stroke="#9CA3AF"
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="weight" className="space-y-4">
                    <Card className="border-none shadow-card">
                        <CardHeader>
                            <CardTitle>Weight Loss Journey</CardTitle>
                            <CardDescription>Weekly weight check-ins.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={WEIGHT_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="weight"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
