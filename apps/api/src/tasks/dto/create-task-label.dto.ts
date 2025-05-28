import { IsString, IsOptional, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskLabelDto {
  @ApiProperty({ description: 'The name of the label' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'The color of the label in hex format', required: false })
  @IsOptional()
  @IsHexColor()
  color?: string = '#000000';

  @ApiProperty({ description: 'Optional description of the label', required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 