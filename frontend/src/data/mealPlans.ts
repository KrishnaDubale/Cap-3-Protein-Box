import { Meal } from './meals';

export interface DietPlan {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
    bestFor: string;
    image: string;
    meals: Meal[];
}

export const MEAL_PLANS: DietPlan[] = [
    {
        id: 'bulking',
        title: 'Bulking Plan',
        subtitle: 'High Protein + High Calories',
        description: 'Designed for muscle gain with a surplus of calories and high protein intake.',
        calories: '2800–3500',
        protein: '160g–220g',
        carbs: 'Moderate',
        fats: 'Moderate',
        bestFor: 'Muscle Gain',
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=500',
        meals: [
            {
                id: 'bulk-1',
                title: 'High-Protein Chicken Bowl',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
                calories: 850,
                protein: 65,
                carbs: 80,
                fats: 25,
                price: 450,
                tags: ['High Protein', 'Bulking'],
                description: 'Grilled chicken breast with quinoa and roasted vegetables.'
            },
            {
                id: 'bulk-2',
                title: 'Paneer Quinoa Power Box',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
                calories: 780,
                protein: 45,
                carbs: 90,
                fats: 30,
                price: 400,
                tags: ['Veg', 'Bulking'],
                description: 'Spiced paneer cubes with quinoa and mixed beans.'
            },
            {
                id: 'bulk-3',
                title: 'Beef Rice Macro Pack',
                image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=500',
                calories: 900,
                protein: 70,
                carbs: 85,
                fats: 35,
                price: 550,
                tags: ['High Protein', 'Bulking'],
                description: 'Lean beef stir-fry with brown rice and broccoli.'
            }
        ]
    },
    {
        id: 'cutting',
        title: 'Cutting Plan',
        subtitle: 'Low Calories + High Protein',
        description: 'Optimized for fat loss while maintaining lean muscle mass.',
        calories: '1500–1800',
        protein: '140g–180g',
        carbs: 'Low',
        fats: 'Low',
        bestFor: 'Fat Loss',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500',
        meals: [
            {
                id: 'cut-1',
                title: '400-Calorie Salad Bowl',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
                calories: 400,
                protein: 35,
                carbs: 20,
                fats: 15,
                price: 350,
                tags: ['Low Calorie', 'Cutting'],
                description: 'Fresh greens with grilled chicken and light vinaigrette.'
            },
            {
                id: 'cut-2',
                title: 'Grilled Tofu Low-Carb Box',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
                calories: 380,
                protein: 30,
                carbs: 15,
                fats: 18,
                price: 320,
                tags: ['Veg', 'Cutting', 'Low Carb'],
                description: 'Marinated tofu with steamed vegetables.'
            },
            {
                id: 'cut-3',
                title: 'Chicken Breast Veg Platter',
                image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500',
                calories: 420,
                protein: 45,
                carbs: 10,
                fats: 12,
                price: 380,
                tags: ['High Protein', 'Cutting'],
                description: 'Herb-crusted chicken breast with asparagus and peppers.'
            }
        ]
    },
    {
        id: 'balanced',
        title: 'Balanced Plan',
        subtitle: 'Moderate Macros',
        description: 'A well-rounded diet for maintaining weight and general health.',
        calories: '2000–2400',
        protein: '120g–150g',
        carbs: 'Moderate',
        fats: 'Moderate',
        bestFor: 'Maintenance',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=500',
        meals: [
            {
                id: 'bal-1',
                title: 'Balanced Macro Meal Plate',
                image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=500',
                calories: 600,
                protein: 40,
                carbs: 60,
                fats: 20,
                price: 400,
                tags: ['Balanced'],
                description: 'Perfect mix of protein, carbs, and healthy fats.'
            },
            {
                id: 'bal-2',
                title: 'Oats + Protein Breakfast Mix',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
                calories: 550,
                protein: 30,
                carbs: 70,
                fats: 15,
                price: 250,
                tags: ['Veg', 'Breakfast'],
                description: 'Rolled oats with whey protein and berries.'
            },
            {
                id: 'bal-3',
                title: 'Lentil & Veg Health Box',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
                calories: 580,
                protein: 25,
                carbs: 80,
                fats: 10,
                price: 300,
                tags: ['Veg', 'Balanced'],
                description: 'Hearty lentil stew with brown rice.'
            }
        ]
    },
    {
        id: 'keto',
        title: 'Keto Plan',
        subtitle: 'High Fat, Very Low Carb',
        description: 'Forces your body into ketosis to burn fat for fuel.',
        calories: '1800–2200',
        protein: 'Moderate',
        carbs: '< 50g',
        fats: 'High',
        bestFor: 'Fat Burn',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=500',
        meals: [
            {
                id: 'keto-1',
                title: 'Keto Chicken Alfredo',
                image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=500',
                calories: 750,
                protein: 45,
                carbs: 8,
                fats: 55,
                price: 480,
                tags: ['Keto', 'High Fat'],
                description: 'Chicken breast in rich alfredo sauce with zucchini noodles.'
            },
            {
                id: 'keto-2',
                title: 'Avocado Egg Bowl',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
                calories: 600,
                protein: 25,
                carbs: 5,
                fats: 45,
                price: 350,
                tags: ['Keto', 'Veg'],
                description: 'Baked eggs in avocado halves with bacon bits.'
            },
            {
                id: 'keto-3',
                title: 'Paneer Keto Platter',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
                calories: 680,
                protein: 30,
                carbs: 10,
                fats: 50,
                price: 400,
                tags: ['Keto', 'Veg'],
                description: 'Grilled paneer with buttered vegetables.'
            }
        ]
    },
    {
        id: 'vegan',
        title: 'Vegan Fitness Plan',
        subtitle: 'Plant-Based Protein',
        description: '100% plant-based meals rich in protein and nutrients.',
        calories: '2000–2500',
        protein: '100g–140g',
        carbs: 'High',
        fats: 'Moderate',
        bestFor: 'Vegan Athletes',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
        meals: [
            {
                id: 'vegan-1',
                title: 'High-Protein Chickpea Bowl',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
                calories: 650,
                protein: 30,
                carbs: 90,
                fats: 15,
                price: 320,
                tags: ['Vegan', 'High Protein'],
                description: 'Spiced chickpeas with quinoa and tahini dressing.'
            },
            {
                id: 'vegan-2',
                title: 'Tofu Stir Fry',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
                calories: 580,
                protein: 25,
                carbs: 60,
                fats: 20,
                price: 350,
                tags: ['Vegan'],
                description: 'Crispy tofu with mixed asian vegetables.'
            },
            {
                id: 'vegan-3',
                title: 'Quinoa & Lentil Protein Box',
                image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=500',
                calories: 620,
                protein: 28,
                carbs: 85,
                fats: 12,
                price: 300,
                tags: ['Vegan'],
                description: 'Protein-packed lentils and quinoa mix.'
            }
        ]
    },
    {
        id: 'athlete',
        title: 'Athlete Performance',
        subtitle: 'High Carbs + Protein',
        description: 'Fuel for high-intensity training and endurance sports.',
        calories: '3000–4000',
        protein: '180g–220g',
        carbs: 'High',
        fats: 'Moderate',
        bestFor: 'Performance',
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=500',
        meals: [
            {
                id: 'ath-1',
                title: 'Carb-Loaded Pasta Box',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
                calories: 950,
                protein: 45,
                carbs: 120,
                fats: 25,
                price: 450,
                tags: ['High Carb', 'Athlete'],
                description: 'Whole wheat pasta with lean meat sauce.'
            },
            {
                id: 'ath-2',
                title: 'Grilled Chicken + Sweet Potato',
                image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=500',
                calories: 800,
                protein: 60,
                carbs: 90,
                fats: 20,
                price: 420,
                tags: ['High Protein', 'Athlete'],
                description: 'Classic bodybuilder meal for recovery.'
            },
            {
                id: 'ath-3',
                title: 'Power Smoothie Bowl',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500',
                calories: 700,
                protein: 35,
                carbs: 100,
                fats: 15,
                price: 350,
                tags: ['Veg', 'Athlete'],
                description: 'Acai bowl topped with granola, fruits, and protein powder.'
            }
        ]
    }
];
