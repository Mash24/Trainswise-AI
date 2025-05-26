import { IsString, IsUUID } from 'class-validator';

export class DisputeReviewDto {
  @IsUUID()
  reviewId: string;

  @IsString()
  reason: string;
} 