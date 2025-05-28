import { PrismaClient } from '@prisma/client';
import { Task, TaskType, TaskDifficulty, TaskPriority, User } from '@nexusloop/types';
import { PrismaService } from './prisma.service';
export * from '@prisma/client';
export { PrismaService };
declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export { prisma };
export type { Task, User };
export { TaskType, TaskDifficulty, TaskPriority };
