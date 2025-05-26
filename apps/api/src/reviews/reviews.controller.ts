import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { DisputeReviewDto } from './dto/dispute-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Submission not found.' })
  create(@Body() dto: CreateReviewDto, @Request() req) {
    // reviewerId comes from token
    return this.reviewsService.createReview({ ...dto, reviewerId: req.user.id });
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Get a review by task id' })
  @ApiResponse({ status: 200, description: 'Return the review.' })
  @ApiResponse({ status: 404, description: 'No review for this task.' })
  getByTask(@Param('taskId') taskId: string) {
    return this.reviewsService.getReviewByTask(taskId);
  }

  @Get('submission/:submissionId')
  @ApiOperation({ summary: 'Get a review by submission id' })
  @ApiResponse({ status: 200, description: 'Return the review.' })
  @ApiResponse({ status: 404, description: 'No review for this submission.' })
  getBySubmission(@Param('submissionId') submissionId: string) {
    return this.reviewsService.getReviewBySubmission(submissionId);
  }

  @Post(':id/dispute')
  @Roles(UserRole.CLIENT, UserRole.WORKER)
  @ApiOperation({ summary: 'Dispute a review' })
  @ApiResponse({ status: 200, description: 'The review has been successfully disputed.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  dispute(@Param('id') id: string, @Body() dto: DisputeReviewDto, @Request() req) {
    return this.reviewsService.disputeReview(id, dto.reason, req.user.id);
  }
} 