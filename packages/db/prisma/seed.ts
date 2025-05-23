import { PrismaClient, UserRole, TaskType, TaskStatus, TaskDifficulty, SubmissionStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nexusloop.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 10),
      role: UserRole.ADMIN,
      profile: {
        create: {
          bio: 'System Administrator',
          skills: ['Management', 'System Administration'],
          experience: 10,
          rating: 5.0,
        },
      },
    },
  });

  // Create a reviewer user
  const reviewer = await prisma.user.create({
    data: {
      email: 'reviewer@nexusloop.com',
      name: 'Reviewer User',
      password: await bcrypt.hash('reviewer123', 10),
      role: UserRole.REVIEWER,
      profile: {
        create: {
          bio: 'Senior Reviewer',
          skills: ['Review', 'Quality Assurance'],
          experience: 8,
          rating: 4.8,
        },
      },
    },
  });

  // Create a regular user
  const user = await prisma.user.create({
    data: {
      email: 'user@nexusloop.com',
      name: 'Regular User',
      password: await bcrypt.hash('user123', 10),
      role: UserRole.USER,
      profile: {
        create: {
          bio: 'AI Enthusiast',
          skills: ['Data Annotation', 'Image Labeling'],
          experience: 2,
          rating: 4.0,
        },
      },
    },
  });

  // Create some tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'Text Annotation Task',
      description: 'Annotate the following text data for sentiment analysis.',
      type: TaskType.TEXT_ANNOTATION,
      status: TaskStatus.OPEN,
      difficulty: TaskDifficulty.EASY,
      reward: 10.0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Image Labeling Task',
      description: 'Label the following images for object detection.',
      type: TaskType.IMAGE_LABELING,
      status: TaskStatus.OPEN,
      difficulty: TaskDifficulty.MEDIUM,
      reward: 15.0,
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    },
  });

  const task3 = await prisma.task.create({
    data: {
      title: 'Data Cleaning Task',
      description: 'Clean and preprocess the following dataset for machine learning.',
      type: TaskType.DATA_CLEANING,
      status: TaskStatus.OPEN,
      difficulty: TaskDifficulty.HARD,
      reward: 20.0,
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    },
  });

  console.log('Seed data created successfully!');
  console.log('Created users:', { admin: admin.email, reviewer: reviewer.email, user: user.email });
  console.log('Created tasks:', { task1: task1.title, task2: task2.title, task3: task3.title });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 