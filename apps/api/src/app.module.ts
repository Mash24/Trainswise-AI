import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { appConfig, authConfig, databaseConfig, redisConfig, rateLimitConfig } from '@nexusloop/config';
import { CacheStoreFactory } from '@nestjs/common/cache/interfaces/cache-manager.interface';
import { TasksModule } from './tasks/tasks.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WalletModule } from './wallet/wallet.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig, redisConfig, rateLimitConfig],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL', 60 * 60), // 1 hour default
        max: configService.get('CACHE_MAX_ITEMS', 100), // 100 items default
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
    TasksModule,
    SubmissionsModule,
    ReviewsModule,
    WalletModule,
    NotificationsModule,
  ],
})
export class AppModule {} 