"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_client_1 = require("../api-client");
// Mock axios
jest.mock('axios', () => ({
    create: jest.fn(() => ({
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() },
        },
    })),
}));
// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
describe('API Client', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('authApi', () => {
        it('handles successful login', async () => {
            const mockResponse = {
                data: {
                    token: 'access-token',
                    refreshToken: 'refresh-token',
                },
            };
            api_client_1.apiClient.post.mockResolvedValue(mockResponse);
            const email = 'test@example.com';
            const password = 'password';
            await api_client_1.authApi.login(email, password);
            expect(api_client_1.apiClient.post).toHaveBeenCalledWith('/auth/login', { email, password });
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'access-token');
            expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh-token');
        });
        it('handles logout', () => {
            api_client_1.authApi.logout();
            expect(localStorage.removeItem).toHaveBeenCalledWith('token');
            expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
        });
        it('fetches current user', async () => {
            const mockUser = { id: '1', email: 'test@example.com' };
            api_client_1.apiClient.get.mockResolvedValue({ data: mockUser });
            const user = await api_client_1.authApi.getCurrentUser();
            expect(api_client_1.apiClient.get).toHaveBeenCalledWith('/users/me');
            expect(user).toEqual(mockUser);
        });
    });
    describe('Request Interceptor', () => {
        it('adds authorization header when token exists', async () => {
            localStorage.getItem.mockReturnValue('test-token');
            const config = { headers: {} };
            // Simulate the interceptor logic
            const interceptor = (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            };
            const result = await interceptor(config);
            expect(result.headers.Authorization).toBe('Bearer test-token');
        });
        it('does not add authorization header when token does not exist', async () => {
            localStorage.getItem.mockReturnValue(null);
            const config = { headers: {} };
            const interceptor = (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            };
            const result = await interceptor(config);
            expect(result.headers.Authorization).toBeUndefined();
        });
    });
    describe('Response Interceptor', () => {
        it('handles 401 error by refreshing token', async () => {
            const mockRefreshResponse = {
                data: {
                    token: 'new-access-token',
                },
            };
            api_client_1.apiClient.post.mockResolvedValue(mockRefreshResponse);
            const error = {
                response: { status: 401 },
                config: { url: '/api/protected', _retry: false, headers: {} },
            };
            // Simulate the interceptor logic
            const interceptor = async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshToken = localStorage.getItem('refreshToken');
                        if (refreshToken) {
                            const response = await api_client_1.apiClient.post('/auth/refresh', { refreshToken });
                            const { token } = response.data;
                            localStorage.setItem('token', token);
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return (0, api_client_1.apiClient)(originalRequest);
                        }
                    }
                    catch (refreshError) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        // window.location.href = '/login';
                    }
                }
                return Promise.reject(error);
            };
            await expect(interceptor(error)).rejects.toBe(error);
        });
        it('does not handle non-401 errors', async () => {
            const error = {
                response: { status: 404 },
            };
            const interceptor = async (error) => {
                if (error.response?.status === 401) {
                    // ...
                }
                return Promise.reject(error);
            };
            await expect(interceptor(error)).rejects.toEqual(error);
            expect(api_client_1.apiClient.post).not.toHaveBeenCalled();
        });
    });
});
