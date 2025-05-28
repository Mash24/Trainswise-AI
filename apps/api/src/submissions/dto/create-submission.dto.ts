import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ description: 'The task ID' })
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({ description: 'The submission content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Optional attachments', required: false })
  @IsOptional()
  attachments?: Express.Multer.File[];
} 