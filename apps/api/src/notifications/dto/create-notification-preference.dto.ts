import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationPreferenceDto {
  @ApiProperty({ description: 'The type of notification' })
  @IsString()
  type: string = '';

  @ApiProperty({ description: 'Whether to receive email notifications', default: true })
  @IsOptional()
  @IsBoolean()
  emailEnabled?: boolean = true;

  @ApiProperty({ description: 'Whether to receive in-app notifications', default: true })
  @IsOptional()
  @IsBoolean()
  inAppEnabled?: boolean = true;

  @ApiProperty({ description: 'Whether to receive push notifications', default: true })
  @IsOptional()
  @IsBoolean()
  pushEnabled?: boolean = true;
} 