import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { appConfig, authConfig, databaseConfig, redisConfig, rateLimitConfig } from '@nexusloop/config';
import { CacheStoreFactory } from '@nestjs/common/cache/interfaces/cache-manager.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig, redisConfig, rateLimitConfig],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        if (process.env.NODE_ENV === 'test') {
          // Use in-memory cache for tests
          return {
            store: 'memory' as any,
            max: 100,
            ttl: 5,
          };
        }
        return {
          store: redisStore as unknown as CacheStoreFactory,
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
          ttl: 5,
          max: 100,
        };
      },
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {} 