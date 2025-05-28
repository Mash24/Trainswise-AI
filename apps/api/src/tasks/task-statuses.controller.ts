import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-statuses')
export class TaskStatusesController {
  @Post()
  create(@Body() dto: CreateTaskStatusDto, @Request() req: ExpressRequest) {
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