import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export const Settings = () => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Card className="border-none shadow-card">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="john@example.com" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            <Card className="border-none shadow-card">
                <CardHeader>
                    <CardTitle>Fitness Goals</CardTitle>
                    <CardDescription>Update your physical stats and targets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input id="height" type="number" defaultValue="180" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" type="number" defaultValue="82.5" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goal">Primary Goal</Label>
                            <Select defaultValue="cut">
                                <SelectTrigger id="goal">
                                    <SelectValue placeholder="Select goal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cut">Weight Loss (Cut)</SelectItem>
                                    <SelectItem value="bulk">Muscle Gain (Bulk)</SelectItem>
                                    <SelectItem value="maintain">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="activity">Activity Level</Label>
                        <Select defaultValue="moderate">
                            <SelectTrigger id="activity">
                                <SelectValue placeholder="Select activity level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sedentary">Sedentary (Office Job)</SelectItem>
                                <SelectItem value="light">Lightly Active (1-2 days/week)</SelectItem>
                                <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                                <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Update Goals</Button>
                </CardFooter>
            </Card>

            <Card className="border-none shadow-card">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Meal Reminders</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts when it's time to eat.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Weekly Progress Report</Label>
                            <p className="text-sm text-muted-foreground">Get a summary of your stats every Sunday.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Promotional Emails</Label>
                            <p className="text-sm text-muted-foreground">Receive offers and updates about new features.</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
