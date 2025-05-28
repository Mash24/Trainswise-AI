import { IsString, IsEnum, IsNumber, IsOptional, IsArray, IsDate, Min, IsUUID, MinLength } from 'class-validator';
import { TaskType, TaskDifficulty } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsString()
  @MinLength(3)
  title: string = '';

  @ApiProperty({ description: 'The description of the task' })
  @IsString()
  @MinLength(10)
  description: string = '';

  @ApiProperty({ enum: TaskType, description: 'The type of task' })
  @IsEnum(TaskType)
  type: TaskType = TaskType.TEXT_ANNOTATION;

  @ApiProperty({ enum: TaskDifficulty, description: 'The difficulty level of the task' })
  @IsEnum(TaskDifficulty)
  difficulty: TaskDifficulty = TaskDifficulty.EASY;

  @ApiProperty({ description: 'The reward amount for completing the task', minimum: 0 })
  @IsNumber()
  @Min(0)
  reward: number = 0;

  @ApiProperty({ description: 'The deadline for task completion', required: false })
  @IsOptional()
  @IsDate()
  deadline?: Date;

  @ApiProperty({ description: 'Categories the task belongs to', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  category?: string[];

  @ApiProperty({ description: 'Tags associated with the task', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Estimated time to complete the task in minutes', required: false, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedTime?: number;

  @ApiProperty({ description: 'ID of the worker assigned to the task', required: false })
  @IsOptional()
  @IsUUID()
  workerId?: string;
} 