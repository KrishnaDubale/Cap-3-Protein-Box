import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Utensils,
    CalendarDays,
    CreditCard,
    Activity,
    Sparkles,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User,
    Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: Utensils, label: 'Order Meals', href: '/dashboard/meals' },
        { icon: CalendarDays, label: 'Meal Plans', href: '/dashboard/meal-plans' },
        { icon: User, label: 'Diet Plan', href: '/dashboard/diet-plan' },
        { icon: CreditCard, label: 'Membership', href: '/dashboard/membership' },
        { icon: Activity, label: 'Progress', href: '/dashboard/progress' },
        { icon: Sparkles, label: 'AI Coach', href: '/dashboard/ai-coach' },
        { icon: Package, label: 'Order History', href: '/dashboard/orders' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div
            className={cn(
                "relative flex flex-col border-r bg-card transition-all duration-300 ease-in-out h-screen sticky top-0",
                collapsed ? "w-20" : "w-64",
                className
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 border-b">
                {!collapsed && (
                    <span className="text-xl font-bold text-primary tracking-tight">
                        FitEats
                    </span>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="ml-auto"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>

            <ScrollArea className="flex-1 py-4">
                <nav className="grid gap-1 px-2">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.href}
                            end={item.href === '/dashboard'}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                                isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : "text-muted-foreground",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                                    {!collapsed && <span>{item.label}</span>}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </ScrollArea>

            <div className="p-4 border-t mt-auto">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <LogOut className="h-5 w-5 mr-2" />
                    {!collapsed && "Logout"}
                </Button>
            </div>
        </div>
    );
};
