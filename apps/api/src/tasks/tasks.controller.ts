import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Query,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { BulkCreateTasksDto } from './dto/bulk-create-tasks.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

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
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  findAll(@Request() req, @Query() query) {
    // Add user-specific filters based on role
    const filters = { ...query };
    
    if (req.user.role === UserRole.CLIENT) {
      filters.clientId = req.user.id;
    } else if (req.user.role === UserRole.WORKER) {
      filters.workerId = req.user.id;
    }

    return this.tasksService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, description: 'Return the task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user.id);
  }

  @Post(':id/assign')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Assign a task to a worker' })
  @ApiResponse({ status: 200, description: 'The task has been successfully assigned.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  assignTask(
    @Param('id') id: string,
    @Body('workerId') workerId: string,
    @Request() req,
  ) {
    if (!workerId) {
      throw new BadRequestException('workerId is required');
    }
    return this.tasksService.assignTask(id, workerId, req.user.id);
  }

  @Post(':id/complete')
  @Roles(UserRole.WORKER)
  @ApiOperation({ summary: 'Mark a task as completed' })
  @ApiResponse({ status: 200, description: 'The task has been successfully completed.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  completeTask(@Param('id') id: string, @Request() req) {
    return this.tasksService.completeTask(id, req.user.id);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Add a comment to a task' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully added.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  addComment(
    @Param('id') id: string,
    @Body('content') content: string,
    @Request() req,
  ) {
    if (!content) {
      throw new BadRequestException('content is required');
    }
    return this.tasksService.addComment(id, content, req.user.id);
  }

  @Post(':id/milestones')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Add a milestone to a task' })
  @ApiResponse({ status: 201, description: 'The milestone has been successfully added.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  addMilestone(
    @Param('id') id: string,
    @Body() milestoneData: {
      title: string;
      description?: string;
      dueDate: Date;
    },
    @Request() req,
  ) {
    return this.tasksService.addMilestone(id, milestoneData, req.user.id);
  }

  // Template endpoints
  @Post('templates')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Create a new task template' })
  @ApiResponse({ status: 201, description: 'The task template has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createTemplate(
    @Body() createTemplateDto: CreateTaskTemplateDto,
    @Request() req,
  ) {
    return this.tasksService.createTaskTemplate(createTemplateDto, req.user.id);
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get all task templates' })
  @ApiResponse({ status: 200, description: 'Return all task templates.' })
  getTemplates(
    @Request() req,
    @Query('includePublic') includePublic?: boolean,
  ) {
    return this.tasksService.getTaskTemplates(req.user.id, includePublic);
  }

  @Post('templates/:id/create-task')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Create a task from a template' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created from the template.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task template not found.' })
  createTaskFromTemplate(
    @Param('id') templateId: string,
    @Body() customizations: Partial<CreateTaskDto>,
    @Request() req,
  ) {
    return this.tasksService.createTaskFromTemplate(
      templateId,
      req.user.id,
      customizations,
    );
  }

  @Patch('templates/:id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Update a task template' })
  @ApiResponse({ status: 200, description: 'The task template has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Task template not found.' })
  updateTemplate(
    @Param('id') templateId: string,
    @Body() updateData: Partial<CreateTaskTemplateDto>,
    @Request() req,
  ) {
    return this.tasksService.updateTaskTemplate(
      templateId,
      updateData,
      req.user.id,
    );
  }

  @Delete('templates/:id')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Delete a task template' })
  @ApiResponse({ status: 200, description: 'The task template has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task template not found.' })
  deleteTemplate(@Param('id') templateId: string, @Request() req) {
    return this.tasksService.deleteTaskTemplate(templateId, req.user.id);
  }

  // Bulk operations
  @Post('bulk')
  @Roles(UserRole.CLIENT)
  @ApiOperation({ summary: 'Bulk create tasks' })
  @ApiResponse({ status: 201, description: 'The tasks have been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  bulkCreateTasks(@Body() bulkCreateDto: BulkCreateTasksDto, @Request() req) {
    return this.tasksService.bulkCreateTasks(bulkCreateDto, req.user.id);
  }

  @Get('analytics/completion-rate')
  @ApiOperation({ summary: 'Get task completion rate' })
  @ApiResponse({ status: 200, description: 'Return the task completion rate.' })
  getCompletionRate() {
    return this.tasksService.getCompletionRate();
  }

  @Get('analytics/average-completion-time')
  @ApiOperation({ summary: 'Get average task completion time' })
  @ApiResponse({ status: 200, description: 'Return the average task completion time.' })
  getAverageCompletionTime() {
    return this.tasksService.getAverageCompletionTime();
  }

  @Get('analytics/task-distribution')
  @ApiOperation({ summary: 'Get task distribution' })
  @ApiResponse({ status: 200, description: 'Return the task distribution.' })
  getTaskDistribution() {
    return this.tasksService.getTaskDistribution();
  }

  @Get('analytics/earnings-per-user')
  @ApiOperation({ summary: 'Get earnings per user' })
  @ApiResponse({ status: 200, description: 'Return the earnings per user.' })
  getEarningsPerUser() {
    return this.tasksService.getEarningsPerUser();
  }
} 