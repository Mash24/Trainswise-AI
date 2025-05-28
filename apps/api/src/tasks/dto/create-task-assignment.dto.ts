import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskAssignmentDto {
  @ApiProperty({ description: 'The ID of the task to assign' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The ID of the user to assign the task to' })
  @IsUUID()
  userId: string = '';

  @ApiProperty({ description: 'Optional notes about the assignment', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
} 