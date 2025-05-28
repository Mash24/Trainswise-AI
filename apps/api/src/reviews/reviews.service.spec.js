"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reviews_service_1 = require("./reviews.service");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
describe('ReviewsService', () => {
    let service;
    let prisma;
    let notificationsGateway;
    const mockPrismaService = {
        review: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        submission: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
        },
    };
    const mockNotificationsGateway = {
        notifyTaskStatusChange: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                reviews_service_1.ReviewsService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
                { provide: notifications_gateway_1.NotificationsGateway, useValue: mockNotificationsGateway },
            ],
        }).compile();
        service = module.get(reviews_service_1.ReviewsService);
        prisma = module.get(prisma_service_1.PrismaService);
        notificationsGateway = module.get(notifications_gateway_1.NotificationsGateway);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('createReview', () => {
        it('should create a review', async () => {
            const createReviewDto = { submissionId: 'submission-id', reviewerId: 'reviewer-id', feedback: 'Good job', score: 5 };
            const submission = {
                id: 'submission-id',
                status: 'APPROVED',
                taskId: 'task-id',
                workerId: 'worker-id'
            };
            const expectedReview = { id: 'review-id', ...createReviewDto };
            mockPrismaService.submission.findUnique.mockResolvedValue(submission);
            mockPrismaService.review.findUnique.mockResolvedValue(null);
            mockPrismaService.review.create.mockResolvedValue(expectedReview);
            const result = await service.createReview(createReviewDto);
            expect(result).toEqual(expectedReview);
            expect(mockNotificationsGateway.notifyTaskStatusChange).toHaveBeenCalledWith(submission.taskId, submission.workerId, 'REVIEWED');
        });
    });
    describe('getReviewByTask', () => {
        it('should return a review by task id', async () => {
            const taskId = 'task-id';
            const submission = { review: { id: 'review-id' } };
            mockPrismaService.submission.findFirst.mockResolvedValue(submission);
            const result = await service.getReviewByTask(taskId);
            expect(result).toEqual(submission.review);
        });
    });
    describe('getReviewBySubmission', () => {
        it('should return a review by submission id', async () => {
            const submissionId = 'submission-id';
            const expectedReview = { id: 'review-id', submissionId };
            mockPrismaService.review.findUnique.mockResolvedValue(expectedReview);
            const result = await service.getReviewBySubmission(submissionId);
            expect(result).toEqual(expectedReview);
        });
    });
    describe('disputeReview', () => {
        it('should dispute a review', async () => {
            const reviewId = 'review-id';
            const reason = 'Dispute reason';
            const userId = 'user-id';
            const review = {
                id: reviewId,
                feedback: 'Original feedback',
                submissionId: 'submission-id',
                reviewerId: 'reviewer-id'
            };
            const expectedReview = { id: reviewId, feedback: review.feedback + `\n[DISPUTED by ${userId}]: ${reason}` };
            mockPrismaService.review.findUnique.mockResolvedValue(review);
            mockPrismaService.review.update.mockResolvedValue(expectedReview);
            const result = await service.disputeReview(reviewId, reason, userId);
            expect(result).toEqual(expectedReview);
            expect(mockNotificationsGateway.notifyTaskStatusChange).toHaveBeenCalledWith(review.submissionId, review.reviewerId, 'DISPUTED');
        });
    });
});
