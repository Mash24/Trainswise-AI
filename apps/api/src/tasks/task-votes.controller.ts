import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateTaskVoteDto } from './dto/create-task-vote.dto';
import { Request as ExpressRequest } from 'express';

@Controller('task-votes')
export class TaskVotesController {
  @Post()
  create(@Body() dto: CreateTaskVoteDto, @Request() req: ExpressRequest) {
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