export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
    },
    tasks: {
      list: '/tasks',
      create: '/tasks',
      get: (id: string) => `/tasks/${id}`,
      update: (id: string) => `/tasks/${id}`,
      delete: (id: string) => `/tasks/${id}`,
    },
    reviews: {
      list: '/reviews',
      create: '/reviews',
      get: (id: string) => `/reviews/${id}`,
      update: (id: string) => `/reviews/${id}`,
      delete: (id: string) => `/reviews/${id}`,
    },
  },
}; 