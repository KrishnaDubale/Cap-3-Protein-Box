import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MealCard } from '@/components/dashboard/MealCard';
import { cn } from '@/lib/utils';

import { MEALS_DATA } from '@/data/meals';

const SAMPLE_MEALS = MEALS_DATA;

const FILTERS = ['All', 'High Protein', 'Low Carb', 'Under 500 Cal', 'Veg', 'Vegan', 'Keto'];

export const OrderMeals = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recommended');

    const filteredMeals = SAMPLE_MEALS.filter(meal => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === '' ||
            meal.title.toLowerCase().includes(searchLower) ||
            meal.description?.toLowerCase().includes(searchLower) ||
            meal.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const matchesFilter = activeFilter === 'All' || meal.tags.includes(activeFilter);
        return matchesSearch && matchesFilter;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'calories') return a.calories - b.calories;
        if (sortBy === 'protein') return b.protein - a.protein;
        return 0;
    });

    console.log('Search term:', searchTerm);
    console.log('Active filter:', activeFilter);
    console.log('Filtered meals count:', filteredMeals.length);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Order Meals</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="calories">Calories</SelectItem>
                            <SelectItem value="protein">Protein</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search for meals..."
                        className="pl-9 max-w-md bg-card border-none shadow-sm"
                        value={searchTerm}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            console.log('Search input changed:', newValue);
                            setSearchTerm(newValue);
                        }}
                    />
                    {searchTerm && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Searching for: "{searchTerm}" - Found {filteredMeals.length} meals
                        </p>
                    )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {FILTERS.map((filter) => (
                        <Button
                            key={filter}
                            variant={activeFilter === filter ? "default" : "outline"}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "rounded-full whitespace-nowrap transition-all",
                                activeFilter === filter && "shadow-md scale-105"
                            )}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMeals.map((meal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                    <Button variant="outline" disabled>Previous</Button>
                    <Button variant="outline" className="bg-primary text-primary-foreground">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">Next</Button>
                </div>
            </div>
        </div>
    );
};
