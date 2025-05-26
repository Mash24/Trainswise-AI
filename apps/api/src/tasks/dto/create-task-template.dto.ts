import { IsString, IsEnum, IsOptional, IsArray, IsNumber, IsBoolean, Min } from 'class-validator';
import { TaskType, TaskDifficulty, TaskPriority } from '@prisma/client';

export class CreateTaskTemplateDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskType)
  type: TaskType;

  @IsEnum(TaskDifficulty)
  difficulty: TaskDifficulty;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  category?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedTime?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
} 