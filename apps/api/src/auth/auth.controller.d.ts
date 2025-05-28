import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';
type User = {
    id: string;
    email: string;
    name: string | null;
    password: string;
    role: 'USER' | 'ADMIN' | 'REVIEWER';
    createdAt: Date;
    updatedAt: Date;
};
interface RequestWithUser extends Request {
    user: Omit<User, 'password'>;
}
declare class LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<LoginResponse>;
    register(dto: RegisterDto): void;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<LoginResponse>;
    logout(req: RequestWithUser): Promise<void>;
}
export {};
