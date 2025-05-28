import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-assignments')
export class TaskAssignmentsController {
  @Post()
  create(@Body() dto: CreateTaskAssignmentDto, @Request() req: ExpressRequest) {
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