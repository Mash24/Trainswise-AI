import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskChecklistDto } from './dto/create-task-checklist.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-checklists')
export class TaskChecklistsController {
  @Post()
  create(@Body() dto: CreateTaskChecklistDto, @Request() req: ExpressRequest) {
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