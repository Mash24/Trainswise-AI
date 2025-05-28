"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_client_1 = require("./api-client");
exports.authService = {
    async logout() {
        try {
            await api_client_1.apiClient.post('/auth/logout');
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            // Redirect to login page
            window.location.href = '/login';
        }
        catch (error) {
            console.error('Logout failed:', error);
            // Still clear local storage and redirect even if the API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        }
    },
};
