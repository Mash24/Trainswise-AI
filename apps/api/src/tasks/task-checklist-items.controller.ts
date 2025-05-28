import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskChecklistItemDto } from './dto/create-task-checklist-item.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-checklist-items')
export class TaskChecklistItemsController {
  @Post()
  create(@Body() dto: CreateTaskChecklistItemDto, @Request() req: ExpressRequest) {
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