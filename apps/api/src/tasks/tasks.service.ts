import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { BulkCreateTasksDto } from './dto/bulk-create-tasks.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { $Enums } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto, clientId: string) {
    const task = await this.prisma.task.create({
      data: {
        ...createTaskDto,
        clientId,
        status: $Enums.TaskStatus.OPEN,
      },
      include: {
        client: true,
      },
    });
    return task;
  }

  async findAll(filters: {
    status?: $Enums.TaskStatus;
    type?: $Enums.TaskType;
    difficulty?: $Enums.TaskDifficulty;
    clientId?: string;
    assignedToId?: string;
  }) {
    return this.prisma.task.findMany({
      where: {
        status: filters.status,
        type: filters.type,
        difficulty: filters.difficulty,
        clientId: filters.clientId,
        assignedToId: filters.assignedToId,
      },
      include: {
        client: true,
        assignedTo: true,
        submissions: {
          include: {
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        client: true,
        assignedTo: true,
        submissions: {
          include: {
            reviews: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
        attachments: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto & { status?: $Enums.TaskStatus }, userId: string) {
    const task = await this.findOne(id);

    // Only client can update task details
    if (task.clientId !== userId) {
      throw new BadRequestException('Only the task client can update task details');
    }

    const { status, ...updateData } = updateTaskDto;

    // If status is being updated, notify relevant users
    if (status && status !== task.status) {
      if (task.assignedToId) {
        this.notificationsGateway.notifyTaskStatusChange(id, task.assignedToId, status);
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        status: status || task.status,
      },
      include: {
        client: true,
        assignedTo: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id);

    // Only client can delete task
    if (task.clientId !== userId) {
      throw new BadRequestException('Only the task client can delete the task');
    }

    // Optionally notify assigned worker if any (using notifyTaskCompleted if appropriate)
    // if (task.assignedToId) {
    //   this.notificationsGateway.notifyTaskCompleted(id, task.assignedToId);
    // }

    return this.prisma.task.delete({
      where: { id },
    });
  }

  // Remove assignTask, completeTask, and other worker-related methods
  // Remove all logic related to workerId, worker, and priority
  // Update other methods as needed to match the current schema
} 