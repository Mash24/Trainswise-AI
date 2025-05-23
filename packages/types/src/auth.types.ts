export interface JwtPayload {
  email: string;
  sub: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
}

export const AUTH_ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',
  EMAIL_EXISTS: 'Email already exists',
} as const; 