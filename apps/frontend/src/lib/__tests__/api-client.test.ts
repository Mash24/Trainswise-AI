// Reset modules before setting up mocks
jest.resetModules();

const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
};

jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance)
}));

describe('API Client', () => {
let apiClient: typeof import('../apiClient').apiClient;
let authApi: typeof import('../apiClient').authApi;
let API_CONFIG: typeof import('@/config/api').API_CONFIG;

beforeAll(() => {
  // Import after mock is set up
  const apiClientModule = require('../apiClient');
  apiClient = apiClientModule.apiClient;
  authApi = apiClientModule.authApi;
  API_CONFIG = require('@/config/api').API_CONFIG;
});

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    Object.values(mockAxiosInstance).forEach(mock => {
      if (typeof mock === 'function') {
        mock.mockReset();
      }
    });
  });

  describe('authApi', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockAuthResponse = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: mockUser,
    };

    it('should handle successful login', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockAuthResponse });
      const result = await authApi.login('test@example.com', 'password');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        API_CONFIG.endpoints.auth.login,
        {
          email: 'test@example.com',
          password: 'password',
        },
        expect.anything()
      );
      expect(localStorage.getItem('accessToken')).toBe('mock-access-token');
      expect(localStorage.getItem('refreshToken')).toBe('mock-refresh-token');
      expect(result).toEqual(mockAuthResponse);
    });

    it('should handle login failure', async () => {
      const mockError = new Error('Invalid credentials');
      mockAxiosInstance.post.mockRejectedValueOnce(mockError);
      await expect(authApi.login('test@example.com', 'password')).rejects.toThrow('Invalid credentials');
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('should handle successful registration', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockAuthResponse });
      const result = await authApi.register('test@example.com', 'password', 'John', 'Doe');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        API_CONFIG.endpoints.auth.register,
        {
          email: 'test@example.com',
          password: 'password',
          firstName: 'John',
          lastName: 'Doe',
        },
        expect.anything()
      );
      expect(localStorage.getItem('accessToken')).toBe('mock-access-token');
      expect(localStorage.getItem('refreshToken')).toBe('mock-refresh-token');
      expect(result).toEqual(mockAuthResponse);
    });

    it('should handle registration failure', async () => {
      const mockError = new Error('Email already exists');
      mockAxiosInstance.post.mockRejectedValueOnce(mockError);
      await expect(authApi.register('test@example.com', 'password', 'John', 'Doe')).rejects.toThrow('Email already exists');
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('should handle successful logout', async () => {
      localStorage.setItem('accessToken', 'test-access-token');
      localStorage.setItem('refreshToken', 'test-refresh-token');
      mockAxiosInstance.post.mockResolvedValueOnce({ data: { success: true } });
      await authApi.logout();
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        API_CONFIG.endpoints.auth.logout,
        undefined,
        { withCredentials: true }
      );
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('should handle logout failure', async () => {
      localStorage.setItem('accessToken', 'test-access-token');
      localStorage.setItem('refreshToken', 'test-refresh-token');
      const mockError = new Error('Logout failed');
      mockAxiosInstance.post.mockRejectedValueOnce(mockError);
      await expect(authApi.logout()).rejects.toThrow('Logout failed');
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('should handle successful user fetch', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockUser });
      const result = await authApi.getCurrentUser();
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        API_CONFIG.endpoints.auth.me,
        undefined
      );
      expect(result).toEqual(mockUser);
    });

    it('should handle user fetch failure', async () => {
      const mockError = new Error('Not authenticated');
      mockAxiosInstance.get.mockRejectedValueOnce(mockError);
      await expect(authApi.getCurrentUser()).rejects.toThrow('Not authenticated');
    });
  });
}); 