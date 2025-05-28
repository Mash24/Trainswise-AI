import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class ReviewsService {
    private prisma;
    private notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    createReview(dto: CreateReviewDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
    getReviewByTask(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
    getReviewBySubmission(submissionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
    disputeReview(reviewId: string, reason: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
}
