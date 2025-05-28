import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskPriorityDto {
  @ApiProperty({ description: 'The name of the priority level' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'The description of the priority level' })
  @IsString()
  description: string = '';

  @ApiProperty({ description: 'The numeric value of the priority (higher = more important)', required: false })
  @IsOptional()
  @IsNumber()
  value?: number = 0;

  @ApiProperty({ description: 'The color of the priority in hex format', required: false })
  @IsOptional()
  @IsString()
  color?: string = '#000000';
} 