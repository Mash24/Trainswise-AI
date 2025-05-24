import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HealthCheckService } from '@nestjs/terminus';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(HealthCheckService)
        .useValue({
          check: jest.fn().mockResolvedValue({
            status: 'ok',
            info: {
              database: { status: 'up' },
              redis: { status: 'up' },
            },
            error: {},
            details: {
              database: { status: 'up' },
              redis: { status: 'up' },
            },
          }),
        })
        .overrideProvider(PrismaService)
        .useValue({
          $connect: jest.fn(),
          $disconnect: jest.fn(),
          onModuleInit: jest.fn(),
          onModuleDestroy: jest.fn(),
        })
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error in beforeEach:', err);
      throw err;
    }
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        status: 'ok',
        info: {
          database: { status: 'up' },
          redis: { status: 'up' },
        },
        error: {},
        details: {
          database: { status: 'up' },
          redis: { status: 'up' },
        },
      });
  });
}); 