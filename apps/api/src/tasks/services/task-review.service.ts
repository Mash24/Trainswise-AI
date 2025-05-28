import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nexusloop/db';

@Injectable()
export class TaskReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(submission: any, review: any) {
    await this.prisma.notification.create({
      data: {
        userId: submission.task.assignedToId || '',
        type: 'TASK_REVIEW',
        message: `Your task "${submission.task.title}" has been reviewed`,
        data: {
          taskId: submission.taskId,
          submissionId: submission.id,
          reviewId: review.id,
        },
      },
    });
  }

  async createDisputeNotification(submission: any, review: any) {
    await this.prisma.notification.create({
      data: {
        userId: submission.task.assignedToId || '',
        type: 'TASK_REVIEW_DISPUTED',
        message: `Your review for task "${submission.task.title}" has been disputed`,
        data: {
          taskId: submission.taskId,
          submissionId: submission.id,
          reviewId: review.id,
        },
      },
    });
  }

  async createTestNotification(submission: any) {
    const testNotification = await this.prisma.notification.create({
      data: {
        userId: submission.task.assignedToId || '',
        type: 'TEST',
        message: 'Test notification',
        data: {},
      },
    });
    return testNotification;
  }
} 