import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

interface JwtPayload {
  email: string;
  sub: string;
  role: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
}

// Add local User type
interface User {
  id: string;
  email: string;
  name: string | null;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>): Promise<LoginResponse> {
    const payload: JwtPayload = { email: user.email, sub: user.id, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.createRefreshToken(user.id),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const token = randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  async refreshToken(token: string) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!refreshToken || refreshToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = refreshToken.user;
    const payload = { email: user.email, sub: user.id, role: user.role };
    const [newAccessToken, newRefreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.createRefreshToken(user.id),
    ]);

    // Delete the old refresh token
    await this.prisma.refreshToken.delete({
      where: { id: refreshToken.id },
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async logout(token: string) {
    try {
      await this.prisma.refreshToken.delete({
        where: { token },
      });
    } catch (error) {
      // Ignore error if token does not exist
      if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
        // do nothing
      } else {
        throw error;
      }
    }
  }
} 