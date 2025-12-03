import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Dumbbell,
    Scissors,
    Scale,
    Leaf,
    Zap,
    Flame,
    ChevronRight,
    Sparkles,
    Filter,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MEAL_PLANS } from '@/data/mealPlans';
import { MealCard } from '@/components/dashboard/MealCard';
import { cn } from '@/lib/utils';

const PLAN_ICONS: Record<string, any> = {
    bulking: Dumbbell,
    cutting: Scissors,
    balanced: Scale,
    keto: Flame,
    vegan: Leaf,
    athlete: Zap,
};

const FILTERS = ['All', 'High Protein', 'Low Carb', 'Under 500 Cal', 'Breakfast', 'Lunch', 'Dinner'];

export const MealPlans = () => {
    const [selectedPlanId, setSelectedPlanId] = useState(MEAL_PLANS[0].id);
    const [activeFilter, setActiveFilter] = useState('All');

    const selectedPlan = MEAL_PLANS.find(p => p.id === selectedPlanId) || MEAL_PLANS[0];
    const PlanIcon = PLAN_ICONS[selectedPlan.id] || Scale;

    const filteredMeals = selectedPlan.meals.filter(meal => {
        if (activeFilter === 'All') return true;
        // Simple tag matching for demo purposes
        if (activeFilter === 'Under 500 Cal') return meal.calories < 500;
        return meal.tags.includes(activeFilter);
    });

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Choose Your Meal Plan</h1>
                    <p className="text-muted-foreground">Personalized diet plans for every fitness goal</p>
                </div>
            </div>

            {/* Plan Selector */}
            <ScrollArea className="w-full whitespace-nowrap pb-2">
                <div className="flex space-x-2">
                    {MEAL_PLANS.map((plan) => {
                        const Icon = PLAN_ICONS[plan.id];
                        const isSelected = selectedPlanId === plan.id;
                        return (
                            <button
                                key={plan.id}
                                onClick={() => setSelectedPlanId(plan.id)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border",
                                    isSelected
                                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                                        : "bg-background text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {plan.title}
                            </button>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedPlanId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                >
                    {/* Plan Info Card */}
                    <Card className="overflow-hidden border-none shadow-card bg-gradient-to-br from-background to-secondary/20">
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-8 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                            <PlanIcon className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{selectedPlan.title}</h2>
                                            <p className="text-muted-foreground">{selectedPlan.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedPlan.description}
                                    </p>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Calories</p>
                                            <p className="font-bold text-lg">{selectedPlan.calories}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Protein</p>
                                            <p className="font-bold text-lg text-primary">{selectedPlan.protein}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Carbs</p>
                                            <p className="font-bold text-lg">{selectedPlan.carbs}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Fats</p>
                                            <p className="font-bold text-lg">{selectedPlan.fats}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2">
                                        <Badge variant="secondary" className="px-3 py-1">
                                            Best For: {selectedPlan.bestFor}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="relative h-64 md:h-auto overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden" />
                                    <img
                                        src={selectedPlan.image}
                                        alt={selectedPlan.title}
                                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Preview */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Weekly Preview</h3>
                            <Button variant="ghost" size="sm" className="text-primary">
                                View Full Week <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                            <div className="flex space-x-4">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <Card key={day} className={cn(
                                        "w-40 shrink-0 border-none shadow-sm hover:shadow-md transition-all cursor-pointer",
                                        i === 0 ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                                    )}>
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-lg">{day}</span>
                                                <Badge variant="outline" className="text-[10px] h-5">Day {i + 1}</Badge>
                                            </div>
                                            <div className="space-y-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                                                    <span className="truncate">Oats & Berries</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                                    <span className="truncate">Chicken Salad</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                                    <span className="truncate">Grilled Fish</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* Recommended Meals */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="text-xl font-bold">Recommended Meals</h3>
                            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
                                {FILTERS.map((filter) => (
                                    <Button
                                        key={filter}
                                        variant={activeFilter === filter ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setActiveFilter(filter)}
                                        className={cn(
                                            "rounded-full whitespace-nowrap",
                                            activeFilter === filter && "shadow-md"
                                        )}
                                    >
                                        {filter}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredMeals.map((meal) => (
                                <motion.div
                                    key={meal.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MealCard meal={meal} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
