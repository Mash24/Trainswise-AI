import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-priorities')
export class TaskPrioritiesController {
  @Post()
  create(@Body() dto: CreateTaskPriorityDto, @Request() req: ExpressRequest) {
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