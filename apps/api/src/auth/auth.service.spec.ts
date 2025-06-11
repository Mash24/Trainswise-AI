import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let prisma: PrismaService;

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockPrismaService = {
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'Test User',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return user object without password when credentials are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password');
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw NotFoundException when user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.validateUser('nonexistent@example.com', 'password123'))
        .rejects.toThrow(NotFoundException);
    });

    it('should return null when password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return access token, refresh token and user data', async () => {
      const mockAccessToken = 'access-token';
      const mockRefreshToken = 'refresh-token';
      mockJwtService.sign.mockResolvedValue(mockAccessToken);
      jest.spyOn(service as any, 'createRefreshToken').mockResolvedValue(mockRefreshToken);

      const result = await service.login(mockUser);

      expect(result.access_token).toBe(mockAccessToken);
      expect(result.refresh_token).toBe(mockRefreshToken);
      expect(result.user).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
        role: mockUser.role,
      });
    });
  });

  describe('refreshToken', () => {
    const mockRefreshToken = {
      id: '1',
      token: 'valid-token',
      expiresAt: new Date(Date.now() + 86400000), // 1 day from now
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    it('should return new access and refresh tokens', async () => {
      const mockNewAccessToken = 'new-access-token';
      const mockNewRefreshToken = 'new-refresh-token';
      mockPrismaService.refreshToken.findUnique.mockResolvedValue(mockRefreshToken);
      mockJwtService.sign.mockResolvedValue(mockNewAccessToken);
      jest.spyOn(service as any, 'createRefreshToken').mockResolvedValue(mockNewRefreshToken);

      const result = await service.refreshToken('valid-token');

      expect(result.access_token).toBe(mockNewAccessToken);
      expect(result.refresh_token).toBe(mockNewRefreshToken);
      expect(result.user).toEqual({
        id: mockRefreshToken.user.id,
        email: mockRefreshToken.user.email,
        name: mockRefreshToken.user.name,
        role: mockRefreshToken.user.role,
      });
      expect(mockPrismaService.refreshToken.delete).toHaveBeenCalledWith({
        where: { id: mockRefreshToken.id },
      });
    });

    it('should throw UnauthorizedException when refresh token is invalid', async () => {
      mockPrismaService.refreshToken.findUnique.mockResolvedValue(null);

      await expect(service.refreshToken('invalid-token'))
        .rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when refresh token is expired', async () => {
      const expiredToken = {
        ...mockRefreshToken,
        expiresAt: new Date(Date.now() - 86400000), // 1 day ago
      };
      mockPrismaService.refreshToken.findUnique.mockResolvedValue(expiredToken);

      await expect(service.refreshToken('expired-token'))
        .rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should delete refresh token successfully', async () => {
      await service.logout('valid-token');

      expect(mockPrismaService.refreshToken.delete).toHaveBeenCalledWith({
        where: { token: 'valid-token' },
      });
    });

    it('should not throw error when token does not exist', async () => {
      mockPrismaService.refreshToken.delete.mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.logout('nonexistent-token')).resolves.not.toThrow();
    });

    it('should throw error for other types of errors', async () => {
      const error = new Error('Database error');
      mockPrismaService.refreshToken.delete.mockRejectedValue(error);

      await expect(service.logout('valid-token')).rejects.toThrow(error);
    });
  });
}); 