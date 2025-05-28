import { IsUUID, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ChecklistItemDto {
  @ApiProperty({ description: 'The title of the checklist item' })
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'Whether the item is completed', required: false })
  @IsOptional()
  isCompleted?: boolean = false;
}

export class CreateTaskChecklistDto {
  @ApiProperty({ description: 'The ID of the task this checklist belongs to' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The title of the checklist' })
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'The items in the checklist', type: [ChecklistItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  items: ChecklistItemDto[] = [];
} 