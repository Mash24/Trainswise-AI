import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskAttachmentDto } from './dto/create-task-attachment.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-attachments')
export class TaskAttachmentsController {
  @Post()
  create(@Body() dto: CreateTaskAttachmentDto, @Request() req: ExpressRequest) {
    // Implementation
  }

  @Get()
  findAll(@Request() req: ExpressRequest) {
    // Implementation
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    // Implementation
  }
} 