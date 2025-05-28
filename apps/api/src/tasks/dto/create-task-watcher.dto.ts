import { IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskWatcherDto {
  @ApiProperty({ description: 'The ID of the task being watched' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The ID of the user watching the task' })
  @IsUUID()
  userId: string = '';

  @ApiProperty({ description: 'Whether to receive email notifications', required: false })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean = true;

  @ApiProperty({ description: 'Whether to receive in-app notifications', required: false })
  @IsOptional()
  @IsBoolean()
  inAppNotifications?: boolean = true;
} 