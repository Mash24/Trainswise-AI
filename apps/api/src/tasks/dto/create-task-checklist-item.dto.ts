import { IsUUID, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskChecklistItemDto {
  @ApiProperty({ description: 'The ID of the checklist this item belongs to' })
  @IsUUID()
  checklistId: string = '';

  @ApiProperty({ description: 'The title of the checklist item' })
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'Whether the item is completed', required: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean = false;

  @ApiProperty({ description: 'Optional description of the item', required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 