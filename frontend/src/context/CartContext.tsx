import React, { createContext, useContext, useState, useEffect } from 'react';
import { Meal } from '@/data/meals';

export interface CartItem extends Meal {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (meal: Meal) => void;
    removeFromCart: (mealId: string) => void;
    updateQuantity: (mealId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (meal: Meal) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === meal.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === meal.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...meal, quantity: 1 }];
        });
    };

    const removeFromCart = (mealId: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== mealId));
    };

    const updateQuantity = (mealId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(mealId);
            return;
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === mealId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
