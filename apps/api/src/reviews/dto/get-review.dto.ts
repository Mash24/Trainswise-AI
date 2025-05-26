import { IsUUID } from 'class-validator';

export class GetReviewDto {
  @IsUUID()
  taskId?: string;

  @IsUUID()
  submissionId?: string;
} 