import { PrismaClient } from '@prisma/client';
import { Task, TaskType, TaskDifficulty, TaskPriority, User } from '@nexusloop/types';
import { PrismaService } from './prisma.service';

export * from '@prisma/client';
export { PrismaService };

const prisma = new PrismaClient();

export { prisma };

export type { Task, User };
export { TaskType, TaskDifficulty, TaskPriority }; 