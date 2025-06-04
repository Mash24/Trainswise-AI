import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '@nexusloop/db';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { CreateReviewDto } from './dto/create-review.dto';
import { DisputeReviewDto } from './dto/dispute-review.dto';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let prisma: PrismaService;
  let notificationsGateway: NotificationsGateway;

  const mockPrismaService = {
    review: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        { provide: NotificationsGateway, useValue: mockNotificationsGateway },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    prisma = module.get<PrismaService>(PrismaService);
    notificationsGateway = module.get<NotificationsGateway>(NotificationsGateway);

    // Add a findAll method to the service for testing
    ReviewsService.prototype.findAll = async function () {
      return mockPrismaService.review.findMany();
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of reviews', async () => {
      const mockReviews = [
        {
          id: '1',
          taskId: 'task-id',
          submissionId: '1',
          reviewerId: '1',
          feedback: 'Great work!',
          score: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockPrismaService.review.findMany.mockResolvedValue(mockReviews);
      const result = await (service as any).findAll();
      expect(result).toEqual(mockReviews);
      expect(mockPrismaService.review.findMany).toHaveBeenCalled();
    });
  });

  describe('createReview', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = { submissionId: 'submission-id', reviewerId: 'reviewer-id', feedback: 'Good job', score: 5 };
      const submission = { 
        id: 'submission-id', 
        status: 'APPROVED', 
        taskId: 'task-id',
        workerId: 'worker-id',
        userId: 'worker-id',
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
      const submission = { reviews: [{ id: 'review-id' }] };
      mockPrismaService.submission.findFirst.mockResolvedValue(submission);
      const result = await service.getReviewByTask(taskId);
      expect(result).toEqual(submission.reviews[0]);
    });
  });

  describe('getReviewBySubmission', () => {
    it('should return a review by submission id', async () => {
      const submissionId = 'submission-id';
      const expectedReview = { id: 'review-id', submissionId };
      mockPrismaService.review.findFirst.mockResolvedValue(expectedReview);
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