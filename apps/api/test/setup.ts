import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nexusloop_test?schema=public',
    },
  },
});

beforeAll(async () => {
  // Clean up the database before tests
  await prisma.$connect();
  await prisma.$transaction([
    prisma.refreshToken.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
}); 