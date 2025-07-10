import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login
            return Promise.reject(new Error('Token expired'));
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Example of refreshing the token (if supported by backend)
apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error.response?.status === 401) {
        try {
            const refreshResponse = await axios.post('/api/refresh-token', {}, { withCredentials: true });
            const newToken = refreshResponse.data.token;
            localStorage.setItem('token', newToken);
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return apiClient.request(error.config); // Retry the original request
        } catch (refreshError) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default apiClient;