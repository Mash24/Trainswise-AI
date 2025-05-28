import { IsString, IsEnum, IsOptional, IsArray, IsNumber, IsBoolean, Min, MinLength } from 'class-validator';
import { TaskType, TaskDifficulty } from '@prisma/client';

export class CreateTaskTemplateDto {
  @IsString()
  @MinLength(3)
  title: string = '';

  @IsString()
  @MinLength(10)
  description: string = '';

  @IsEnum(TaskType)
  type: TaskType = TaskType.TEXT_ANNOTATION;

  @IsEnum(TaskDifficulty)
  difficulty: TaskDifficulty = TaskDifficulty.EASY;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  category?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedTime?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
} 