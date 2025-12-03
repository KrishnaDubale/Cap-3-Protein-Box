const BASE_URL = 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const api = {
    async request(endpoint: string, options: RequestOptions = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    },

    get(endpoint: string, options: RequestOptions = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    },

    post(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    put(endpoint: string, body: any, options: RequestOptions = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    },

    delete(endpoint: string, options: RequestOptions = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    },
};
