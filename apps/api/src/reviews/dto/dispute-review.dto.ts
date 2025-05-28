import { IsString } from 'class-validator';

export class DisputeReviewDto {
  @IsString()
  reviewId: string = '';

  @IsString()
  reason: string = '';
} 