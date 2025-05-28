import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ description: 'The ID of the user to notify' })
  @IsString()
  userId: string = '';

  @ApiProperty({ description: 'The type of notification' })
  @IsString()
  type: string = '';

  @ApiProperty({ description: 'The title of the notification' })
  @IsString()
  title: string = '';

  @ApiProperty({ description: 'The message content of the notification' })
  @IsString()
  message: string = '';

  @ApiProperty({ description: 'Optional metadata for the notification', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
} 