import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, Plus, Activity, Wheat } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface MealProps {
    id: string;
    title: string;
    image: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    price: number;
    tags: string[];
}

interface MealCardProps {
    meal: MealProps;
}

export const MealCard = ({ meal }: MealCardProps) => {
    const { addToCart } = useCart();
    const { toast } = useToast();
    return (
        <Card className="overflow-hidden border-none shadow-card hover:shadow-hover transition-all duration-300 group h-full flex flex-col">
            <div className="relative overflow-hidden h-48">
                <img
                    src={meal.image}
                    alt={meal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                    {meal.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs font-medium">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <CardHeader className="p-4 pb-0">
                <h3 className="font-heading font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {meal.title}
                </h3>
            </CardHeader>

            <CardContent className="p-4 flex-1">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                    <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
                        <Flame className="h-3 w-3 mb-1 text-orange-500" />
                        <span className="font-semibold text-foreground">{meal.calories}</span>
                        <span>kcal</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
                        <Activity className="h-3 w-3 mb-1 text-blue-500" />
                        <span className="font-semibold text-foreground">{meal.protein}g</span>
                        <span>Prot</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
                        <Wheat className="h-3 w-3 mb-1 text-yellow-500" />
                        <span className="font-semibold text-foreground">{meal.carbs}g</span>
                        <span>Carb</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-primary">
                    ₹{meal.price.toFixed(2)}
                </span>
                <Button
                    size="sm"
                    className="rounded-full group-hover:scale-105 transition-transform"
                    onClick={() => {
                        addToCart(meal);
                        toast({
                            title: "Added to Cart",
                            description: `${meal.title} has been added to your cart.`,
                        });
                    }}
                >
                    <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
            </CardFooter>
        </Card>
    );
};
