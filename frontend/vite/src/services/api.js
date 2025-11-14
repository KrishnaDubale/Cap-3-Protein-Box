// API service for backend communication

// Backend URL - change this to your backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://cap-3-evara-1.onrender.com';
const API_BASE_URL = `${BACKEND_URL}`;

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API functions
export const authAPI = {
  // Sign up a new user
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Failed to parse server response');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Failed to parse server response');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Failed to parse server response');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  },

  // Get all users (for admin/testing)
  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Failed to parse server response');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }

      return data;
    } catch (error) {
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  },
};

// Token management
export const tokenManager = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  hasToken: () => {
    return !!localStorage.getItem('token');
  },
};

