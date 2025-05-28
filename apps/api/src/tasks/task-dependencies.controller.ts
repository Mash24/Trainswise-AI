import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskDependencyDto } from './dto/create-task-dependency.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-dependencies')
export class TaskDependenciesController {
  @Post()
  create(@Body() dto: CreateTaskDependencyDto, @Request() req: ExpressRequest) {
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