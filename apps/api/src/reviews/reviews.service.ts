import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { DisputeReviewDto } from './dto/dispute-review.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createReview(dto: CreateReviewDto) {
    // Ensure submission exists and is completed
    const submission = await this.prisma.submission.findUnique({
      where: { id: dto.submissionId },
      include: { task: true },
    });
    if (!submission) throw new NotFoundException('Submission not found');
    if (submission.status !== 'APPROVED') {
      throw new BadRequestException('Can only review approved submissions');
    }
    // Ensure no review exists yet
    const existing = await this.prisma.review.findFirst({ where: { submissionId: dto.submissionId } });
    if (existing) throw new BadRequestException('Review already exists for this submission');
    // Create review
    const review = await this.prisma.review.create({
      data: {
        submissionId: dto.submissionId,
        reviewerId: dto.reviewerId,
        feedback: dto.feedback,
        score: dto.score,
        taskId: submission.taskId,
      },
    });
    // Notify worker (user who made the submission)
    this.notificationsGateway.notifyTaskStatusChange(submission.taskId, submission.userId, 'REVIEWED');
    return review;
  }

  async getReviewByTask(taskId: string) {
    // Find submission for the task
    const submission = await this.prisma.submission.findFirst({
      where: { taskId },
      include: { reviews: true },
    });
    if (!submission || !submission.reviews || submission.reviews.length === 0) throw new NotFoundException('No review for this task');
    return submission.reviews[0];
  }

  async getReviewBySubmission(submissionId: string) {
    const review = await this.prisma.review.findFirst({ where: { submissionId } });
    if (!review) throw new NotFoundException('No review for this submission');
    return review;
  }

  async disputeReview(reviewId: string, reason: string, userId: string) {
    // For simplicity, just add a disputeReason field (could be a separate model for full workflow)
    const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');
    // Only the worker or client can dispute
    // (You can expand this logic as needed)
    const updatedReview = await this.prisma.review.update({
      where: { id: reviewId },
      data: { feedback: review.feedback + `\n[DISPUTED by ${userId}]: ${reason}` },
    });
    // Notify reviewer
    this.notificationsGateway.notifyTaskStatusChange(review.submissionId, review.reviewerId, 'DISPUTED');
    return updatedReview;
  }
} 