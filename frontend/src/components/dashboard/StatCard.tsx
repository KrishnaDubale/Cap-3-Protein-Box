import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: string;
    trendUp?: boolean;
    className?: string;
    color?: string;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    trendUp,
    className,
    color = "text-primary"
}: StatCardProps) => {
    return (
        <Card className={cn("hover:shadow-hover transition-all duration-300 border-none shadow-card", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={cn("h-4 w-4", color)} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {trend && (
                            <span className={cn("font-medium mr-1", trendUp ? "text-green-500" : "text-red-500")}>
                                {trend}
                            </span>
                        )}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
