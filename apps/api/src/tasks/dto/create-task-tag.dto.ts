import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskTagDto {
  @ApiProperty({ description: 'The name of the tag' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'Optional description of the tag', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Optional color for the tag', required: false })
  @IsOptional()
  @IsString()
  color?: string = '#000000';
} 