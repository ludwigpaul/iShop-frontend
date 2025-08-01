// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const toBase64 = (str) => window.btoa(unescape(encodeURIComponent(str)));

export const login = async (credentials) => {
    try {
        console.log('credentials', JSON.stringify(credentials));
        // Send credentials directly without encryption
        const formData = new URLSearchParams();
        formData.append('username', toBase64(credentials.username));
        formData.append('email', toBase64(credentials.email));
        formData.append('password', toBase64(credentials.password));
        console.log('formData', formData.toString());
        const response = await api.post('/auth/login', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
};

export const getProducts = async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProduct = async (id) => {
    const response = await api.get(`/products/id/${id}`);
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/id/${userId}`); // Update this line
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await api.put(`/users/id/${userId}`, userData); // Update this line
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOrdersByWorkerId = async (workerId) => {
    const response = await api.get(`/worker/${workerId}/orders`);
    return response.data;
};

export default api;