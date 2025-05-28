import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-templates')
export class TaskTemplatesController {
  @Post()
  create(@Body() dto: CreateTaskTemplateDto, @Request() req: ExpressRequest) {
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