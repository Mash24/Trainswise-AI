import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskDifficultyDto } from './dto/create-task-difficulty.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-difficulties')
export class TaskDifficultiesController {
  @Post()
  create(@Body() dto: CreateTaskDifficultyDto, @Request() req: ExpressRequest) {
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