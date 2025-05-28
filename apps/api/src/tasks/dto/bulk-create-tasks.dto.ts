import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';

export class BulkCreateTasksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks: CreateTaskDto[] = [];

  @IsOptional()
  @IsArray()
  workerIds?: string[]; // Optional array of worker IDs to assign tasks to
} 