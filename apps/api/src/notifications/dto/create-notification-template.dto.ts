import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationTemplateDto {
  @ApiProperty({ description: 'The type of notification template' })
  @IsString()
  type: string = '';

  @ApiProperty({ description: 'The title template for the notification' })
  @IsString()
  titleTemplate: string = '';

  @ApiProperty({ description: 'The message template for the notification' })
  @IsString()
  messageTemplate: string = '';

  @ApiProperty({ description: 'Optional metadata for the template', required: false })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
} 