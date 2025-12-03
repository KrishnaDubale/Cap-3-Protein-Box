import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, ThumbsUp, Info } from 'lucide-react';
import { MEALS_DATA, Meal } from '@/data/meals';

const REASONS = [
    'Perfect for your post-workout recovery needs.',
    'Helps you meet your daily protein intake goals.',
    'Low calorie option to keep you on track.',
    'Rich in healthy fats for sustained energy.',
    'Balanced macros for optimal performance.',
    'Great source of fiber for digestion.',
    'Packed with essential vitamins and minerals.',
    'Light and refreshing for a quick lunch.',
    'Hearty meal to keep you full for longer.',
    'Plant-based power for your day.'
];

export const AIRecommendations = () => {
    const [recommendations, setRecommendations] = useState<(Meal & { reason: string })[]>([]);

    useEffect(() => {
        // Randomly select 3 meals
        const shuffledMeals = [...MEALS_DATA].sort(() => 0.5 - Math.random());
        const selectedMeals = shuffledMeals.slice(0, 3);

        // Add random reasons
        const mealsWithReasons = selectedMeals.map(meal => ({
            ...meal,
            reason: REASONS[Math.floor(Math.random() * REASONS.length)]
        }));

        setRecommendations(mealsWithReasons);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-6 w-6" />
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">AI Coach Recommendations</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Personalized meal suggestions based on your current activity level, remaining macros, and dietary preferences.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((item) => (
                    <Card key={item.id} className="border-none shadow-card hover:shadow-hover transition-all duration-300 flex flex-col overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                                {item.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="flex justify-between items-start">
                                <span>{item.title}</span>
                            </CardTitle>
                            <div className="flex gap-3 text-sm text-muted-foreground">
                                <span>{item.calories} kcal</span>
                                <span>•</span>
                                <span>{item.protein}g Protein</span>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1">
                            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                <div className="flex items-start gap-2">
                                    <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-primary block mb-1">Why this meal?</span>
                                        {item.reason}
                                    </p>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="gap-2">
                            <Button className="w-full group-hover:bg-primary/90">
                                Order Now
                            </Button>
                            <Button variant="outline" size="icon">
                                <ThumbsUp className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};
