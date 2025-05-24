import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await service.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database', async () => {
    await expect(service.$connect()).resolves.not.toThrow();
  });

  it('should disconnect from the database', async () => {
    await service.$connect();
    await expect(service.$disconnect()).resolves.not.toThrow();
  });
}); 