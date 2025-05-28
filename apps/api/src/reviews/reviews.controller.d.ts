import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { DisputeReviewDto } from './dto/dispute-review.dto';
import { Request as ExpressRequest } from 'express';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(dto: CreateReviewDto, req: ExpressRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
    getByTask(taskId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
    getBySubmission(submissionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submissionId: string;
        reviewerId: string;
        feedback: string;
        score: number;
        taskId: string;
    }>;
    dispute(id: string, dto: DisputeReviewDto, req: ExpressRequest): Promise<{
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
