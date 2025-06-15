import { apiClient } from './api-client';

export const authService = {
  async logout() {
    try {
      await apiClient.post('/auth/logout');
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local storage and redirect even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  },
}; 