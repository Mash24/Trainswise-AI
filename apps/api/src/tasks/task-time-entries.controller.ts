import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskTimeEntryDto } from './dto/create-task-time-entry.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-time-entries')
export class TaskTimeEntriesController {
  @Post()
  create(@Body() dto: CreateTaskTimeEntryDto, @Request() req: ExpressRequest) {
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