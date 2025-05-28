import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskMilestoneDto } from './dto/create-task-milestone.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-milestones')
export class TaskMilestonesController {
  @Post()
  create(@Body() dto: CreateTaskMilestoneDto, @Request() req: ExpressRequest) {
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