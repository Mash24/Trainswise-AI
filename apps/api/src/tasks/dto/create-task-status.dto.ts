import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskStatusDto {
  @ApiProperty({ description: 'The name of the status' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'The description of the status' })
  @IsString()
  description: string = '';

  @ApiProperty({ description: 'The color of the status in hex format', required: false })
  @IsOptional()
  @IsString()
  color?: string = '#000000';

  @ApiProperty({ description: 'Whether this status indicates task completion', required: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean = false;
} 