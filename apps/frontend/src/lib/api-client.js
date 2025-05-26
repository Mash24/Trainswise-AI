"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authApi = exports.apiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
exports.apiClient = axios_1.default.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor for adding auth token
exports.apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Response interceptor for handling errors
exports.apiClient.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            // Attempt to refresh the token
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                const response = await exports.apiClient.post('/auth/refresh', {
                    refreshToken,
                });
                const { token } = response.data;
                localStorage.setItem('token', token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return (0, exports.apiClient)(originalRequest);
            }
        }
        catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});
// Auth API methods
exports.authApi = {
    login: async (email, password) => {
        const response = await exports.apiClient.post('/auth/login', { email, password });
        const { token, refreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    },
    getCurrentUser: async () => {
        const response = await exports.apiClient.get('/users/me');
        return response.data;
    },
};
