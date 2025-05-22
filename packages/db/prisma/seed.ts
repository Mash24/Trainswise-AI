import { PrismaClient, UserRole, TaskType, TaskStatus, TaskDifficulty, SubmissionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@nexusloop.com',
      name: 'Admin User',
      password: 'admin123', // In production, use a hashed password
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
      password: 'reviewer123', // In production, use a hashed password
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
      password: 'user123', // In production, use a hashed password
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
      deadline: new Date('2025-06-01'),
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
      deadline: new Date('2025-06-15'),
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
      deadline: new Date('2025-06-30'),
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 