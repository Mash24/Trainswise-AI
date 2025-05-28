import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDifficultyDto {
  @ApiProperty({ description: 'The name of the difficulty level' })
  @IsString()
  name: string = '';

  @ApiProperty({ description: 'The description of the difficulty level' })
  @IsString()
  description: string = '';

  @ApiProperty({ description: 'The base reward multiplier for this difficulty', required: false })
  @IsOptional()
  @IsNumber()
  rewardMultiplier?: number = 1.0;

  @ApiProperty({ description: 'The estimated time multiplier for this difficulty', required: false })
  @IsOptional()
  @IsNumber()
  timeMultiplier?: number = 1.0;
} 