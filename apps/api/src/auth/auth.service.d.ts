import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
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
interface User {
    id: string;
    email: string;
    name: string | null;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null>;
    login(user: Omit<User, 'password'>): Promise<LoginResponse>;
    private createRefreshToken;
    refreshToken(token: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
        };
    }>;
    logout(token: string): Promise<void>;
}
export {};
