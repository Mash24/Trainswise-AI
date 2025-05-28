import { IsUUID, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskAttachmentDto {
  @ApiProperty({ description: 'The ID of the task this attachment belongs to' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The name of the attachment file' })
  @IsString()
  fileName: string = '';

  @ApiProperty({ description: 'The URL or path to the attachment' })
  @IsString()
  fileUrl: string = '';

  @ApiProperty({ description: 'The type/mime type of the attachment', required: false })
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiProperty({ description: 'The size of the attachment in bytes', required: false })
  @IsOptional()
  @IsString()
  fileSize?: string;
} 