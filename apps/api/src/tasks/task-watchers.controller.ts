import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskWatcherDto } from './dto/create-task-watcher.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-watchers')
export class TaskWatchersController {
  @Post()
  create(@Body() dto: CreateTaskWatcherDto, @Request() req: ExpressRequest) {
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