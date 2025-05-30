import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(submission: any, review: any) {
    await this.prisma.notification.create({
      data: {
        userId: String(submission.task.assignedToId || ''),
        type: 'TASK_REVIEW',
        title: `Task "${submission.task.title}" Reviewed`,
        message: `Your task "${submission.task.title}" has been reviewed`,
        metadata: {
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
        userId: String(submission.task.assignedToId || ''),
        type: 'TASK_REVIEW_DISPUTED',
        title: `Task "${submission.task.title}" Review Disputed`,
        message: `Your review for task "${submission.task.title}" has been disputed`,
        metadata: {
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
        userId: String(submission.task.assignedToId || ''),
        type: 'TEST',
        title: 'Test Notification',
        message: 'Test notification',
        metadata: {},
      },
    });
    return testNotification;
  }
} 