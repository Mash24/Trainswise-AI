export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
      me: '/users/me',
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
    submissions: {
      list: '/submissions',
      create: '/submissions',
      get: (id: string) => `/submissions/${id}`,
      update: (id: string) => `/submissions/${id}`,
      delete: (id: string) => `/submissions/${id}`,
    },
    notifications: {
      list: '/notifications',
      markRead: (id: string) => `/notifications/${id}/read`,
      markAllRead: '/notifications/read-all',
    },
  },
}; 