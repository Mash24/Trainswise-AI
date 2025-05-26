import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;
    
    const models = Reflect.ownKeys(this).filter((key) => 
      typeof key === 'string' && 
      key[0] !== '_' && 
      key in this
    ) as Array<keyof PrismaClient>;
    
    return Promise.all(
      models.map((modelKey) => (this[modelKey] as any).deleteMany()),
    );
  }
} 