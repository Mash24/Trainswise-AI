import { IsUUID, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskTimeEntryDto {
  @ApiProperty({ description: 'The ID of the task this time entry belongs to' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The ID of the user who logged the time' })
  @IsUUID()
  userId: string = '';

  @ApiProperty({ description: 'The start time of the time entry' })
  @IsDate()
  @Type(() => Date)
  startTime: Date = new Date();

  @ApiProperty({ description: 'The end time of the time entry', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;

  @ApiProperty({ description: 'Optional description of the time entry', required: false })
  @IsOptional()
  @IsString()
  description?: string;
} 