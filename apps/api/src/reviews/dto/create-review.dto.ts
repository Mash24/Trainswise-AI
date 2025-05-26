import { IsString, IsInt, IsUUID, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  submissionId: string;

  @IsUUID()
  reviewerId: string;

  @IsString()
  feedback: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score: number;
} 