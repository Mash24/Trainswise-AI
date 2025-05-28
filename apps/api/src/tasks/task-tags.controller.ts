import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskTagDto } from './dto/create-task-tag.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-tags')
export class TaskTagsController {
  @Post()
  create(@Body() dto: CreateTaskTagDto, @Request() req: ExpressRequest) {
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