import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// You may need to adjust the import path for AppModule depending on your structure

describe('Auth & Users E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    
    // Set global prefix to match main.ts
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Create test user
    // NOTE: Prisma schema expects 'USER', but Postgres enum is lowercase ('user').
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'user' as any, // workaround for enum mismatch
      },
    });
  });

  afterAll(async () => {
    // Clean up test user
    await prisma.user.deleteMany({
      where: { email: 'test@example.com' },
    });
    await app.close();
  });

  it('POST /api/auth/login - should return access and refresh tokens', async () => {
    const loginDto = { 
      email: 'test@example.com', 
      password: 'password123' 
    };
    
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(loginDto)
      .expect(200);
      
    expect(res.body).toHaveProperty('access_token');
    expect(res.body).toHaveProperty('refresh_token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
    expect(res.body.user).toHaveProperty('name', 'Test User');
    expect(res.body.user).toHaveProperty('role', 'user');
    
    accessToken = res.body.access_token;
  });

  it('GET /api/users/profile - should return user profile with valid JWT', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
      
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
    expect(res.body).toHaveProperty('name', 'Test User');
    expect(res.body).toHaveProperty('role', 'user');
  });
}); 