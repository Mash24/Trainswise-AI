import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithUser } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Req() req: RequestWithUser, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  findAll(@Req() req: RequestWithUser) {
    const filters = {
      clientId: req.user.role === UserRole.CLIENT ? req.user.id : undefined,
      assignedToId: req.user.role === UserRole.WORKER ? req.user.id : undefined,
    };
    return this.tasksService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, description: 'Return the task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: RequestWithUser) {
    return this.tasksService.update(id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.tasksService.remove(id, req.user.id);
  }
} 