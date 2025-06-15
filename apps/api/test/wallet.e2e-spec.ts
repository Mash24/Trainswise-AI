import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Wallet E2E', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Login to get access token
    const loginDto = { email: 'test@example.com', password: 'password123' };
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    accessToken = res.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip('POST /wallet/withdraw - should create a withdrawal request (skipped: not implemented)', async () => {
    // This test is skipped because the controller is a placeholder and not implemented.
    // Uncomment and implement when wallet logic is available.
    // const res = await request(app.getHttpServer())
    //   .post('/wallet/withdraw')
    //   .set('Authorization', `Bearer ${accessToken}`)
    //   .send({ amount: 50 })
    //   .expect(201);
    // expect(res.body).toHaveProperty('id');
  });
}); 