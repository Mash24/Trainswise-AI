import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskMilestoneDto {
  @ApiProperty({ description: 'The ID of the task this milestone belongs to' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The title of the milestone' })
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'The description of the milestone' })
  @IsString()
  description: string = '';

  @ApiProperty({ description: 'The due date for the milestone' })
  @IsDate()
  @Type(() => Date)
  dueDate: Date = new Date();

  @ApiProperty({ description: 'Optional completion date', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completedAt?: Date;
} 