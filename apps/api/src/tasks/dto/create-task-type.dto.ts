import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskTypeDto {
  @ApiProperty({ description: 'The name of the task type' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'The description of the task type' })
  @IsString()
  description: string = '';

  @ApiProperty({ description: 'Optional icon for the task type', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: 'Optional color for the task type', required: false })
  @IsOptional()
  @IsString()
  color?: string = '#000000';
} 