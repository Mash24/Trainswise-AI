import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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

class LoginResponse {
  access_token: string = '';
  refresh_token: string = '';
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  } = {
    id: '',
    email: '',
    name: null,
    role: 'USER'
  };
}

@ApiTags('auth')
@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponse, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    // Implementation
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, type: LoginResponse, description: 'Token refreshed successfully' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<LoginResponse> {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 204, description: 'Logout successful' })
  async logout(@Req() req: RequestWithUser): Promise<void> {
    await this.authService.logout(req.user.id);
  }
} 