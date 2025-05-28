import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskLabelDto } from './dto/create-task-label.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-labels')
export class TaskLabelsController {
  @Post()
  create(@Body() dto: CreateTaskLabelDto, @Request() req: ExpressRequest) {
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