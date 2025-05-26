import { PrismaClient, UserRole, TaskType, TaskStatus, TaskDifficulty } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 10),
      role: UserRole.ADMIN,
      profile: {
        create: {
          bio: 'System administrator',
          skills: ['Management', 'System Administration'],
        },
      },
    },
  });

  // Create worker user
  const workerUser = await prisma.user.create({
    data: {
      email: 'worker@example.com',
      name: 'Worker User',
      password: await bcrypt.hash('worker123', 10),
      role: UserRole.WORKER,
      profile: {
        create: {
          bio: 'Professional worker',
          skills: ['Data Entry', 'Quality Assurance'],
        },
      },
    },
  });

  // Create client user
  const clientUser = await prisma.user.create({
    data: {
      email: 'client@example.com',
      name: 'Client User',
      password: await bcrypt.hash('client123', 10),
      role: UserRole.CLIENT,
      profile: {
        create: {
          bio: 'Task client',
          skills: ['Project Management', 'Task Creation'],
        },
      },
    },
  });

  // Create tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Image Annotation Task',
        description: 'Annotate images with bounding boxes',
        type: TaskType.IMAGE_ANNOTATION,
        status: TaskStatus.OPEN,
        difficulty: TaskDifficulty.MEDIUM,
        reward: 50.0,
        deadline: new Date('2024-12-31'),
        client: {
          connect: {
            id: adminUser.id,
          },
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Data Entry Task',
        description: 'Enter data from scanned documents',
        type: TaskType.DATA_ENTRY,
        status: TaskStatus.OPEN,
        difficulty: TaskDifficulty.EASY,
        reward: 30.0,
        deadline: new Date('2024-12-31'),
        client: {
          connect: {
            id: adminUser.id,
          },
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Transcription Task',
        description: 'Transcribe audio recordings',
        type: TaskType.TRANSCRIPTION,
        status: TaskStatus.OPEN,
        difficulty: TaskDifficulty.HARD,
        reward: 100.0,
        deadline: new Date('2024-12-31'),
        client: {
          connect: {
            id: adminUser.id,
          },
        },
      },
    }),
  ]);

  console.log('Seed data created successfully!');
  console.log('Created users:', { adminUser, workerUser, clientUser });
  console.log('Created tasks:', tasks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 