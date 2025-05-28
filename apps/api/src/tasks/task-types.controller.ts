import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-types')
export class TaskTypesController {
  @Post()
  create(@Body() dto: CreateTaskTypeDto, @Request() req: ExpressRequest) {
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