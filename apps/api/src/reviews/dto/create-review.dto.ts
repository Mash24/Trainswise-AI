import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  submissionId: string = '';

  @IsString()
  reviewerId: string = '';

  @IsString()
  feedback: string = '';

  @IsNumber()
  @Min(1)
  @Max(5)
  score: number = 1;
} 