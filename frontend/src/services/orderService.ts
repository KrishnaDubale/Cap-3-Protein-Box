import { CartItem } from '@/context/CartContext';

const API_URL = 'http://localhost:3000/api';

interface CreateOrderData {
    items: CartItem[];
    totalAmount: number;
    deliveryAddress: string;
    paymentMethod: string;
}

export const createOrder = async (orderData: CreateOrderData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        throw new Error('Failed to create order');
    }

    return response.json();
};

export const getMyOrders = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }

    return response.json();
};

export const getOrderDetails = async (orderId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch order details');
    }

    return response.json();
};
