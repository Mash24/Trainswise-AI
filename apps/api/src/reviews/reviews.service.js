"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let ReviewsService = class ReviewsService {
    constructor(prisma, notificationsGateway) {
        this.prisma = prisma;
        this.notificationsGateway = notificationsGateway;
    }
    async createReview(dto) {
        // Ensure submission exists and is completed
        const submission = await this.prisma.submission.findUnique({
            where: { id: dto.submissionId },
            include: { task: true },
        });
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        if (submission.status !== 'APPROVED') {
            throw new common_1.BadRequestException('Can only review approved submissions');
        }
        // Ensure no review exists yet
        const existing = await this.prisma.review.findFirst({ where: { submissionId: dto.submissionId } });
        if (existing)
            throw new common_1.BadRequestException('Review already exists for this submission');
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
    async getReviewByTask(taskId) {
        // Find submission for the task
        const submission = await this.prisma.submission.findFirst({
            where: { taskId },
            include: { reviews: true },
        });
        if (!submission || !submission.reviews || submission.reviews.length === 0)
            throw new common_1.NotFoundException('No review for this task');
        return submission.reviews[0];
    }
    async getReviewBySubmission(submissionId) {
        const review = await this.prisma.review.findFirst({ where: { submissionId } });
        if (!review)
            throw new common_1.NotFoundException('No review for this submission');
        return review;
    }
    async disputeReview(reviewId, reason, userId) {
        // For simplicity, just add a disputeReason field (could be a separate model for full workflow)
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
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
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_gateway_1.NotificationsGateway])
], ReviewsService);
