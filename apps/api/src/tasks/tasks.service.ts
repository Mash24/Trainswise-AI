import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { BulkCreateTasksDto } from './dto/bulk-create-tasks.dto';
import { TaskStatus, TaskPriority, TaskType, TaskDifficulty } from '@prisma/client';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto, clientId: string) {
    const { workerId, ...taskData } = createTaskDto;

    // If workerId is provided, verify the worker exists and is a WORKER
    if (workerId) {
      const worker = await this.prisma.user.findUnique({
        where: { id: workerId },
      });

      if (!worker || worker.role !== 'WORKER') {
        throw new BadRequestException('Invalid worker ID or user is not a worker');
      }
    }

    const task = await this.prisma.task.create({
      data: {
        ...taskData,
        clientId,
        workerId,
        statusHistory: {
          create: {
            status: TaskStatus.OPEN,
            changedBy: clientId,
          },
        },
      },
      include: {
        client: true,
        worker: true,
        statusHistory: true,
      },
    });

    // Notify if task is assigned
    if (workerId) {
      this.notificationsGateway.notifyTaskAssigned(task.id, workerId);
    }

    return task;
  }

  async findAll(filters: {
    status?: TaskStatus;
    type?: TaskType;
    difficulty?: TaskDifficulty;
    priority?: TaskPriority;
    clientId?: string;
    workerId?: string;
  }) {
    return this.prisma.task.findMany({
      where: {
        status: filters.status,
        type: filters.type,
        difficulty: filters.difficulty,
        priority: filters.priority,
        clientId: filters.clientId,
        workerId: filters.workerId,
      },
      include: {
        client: true,
        worker: true,
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
        worker: true,
        statusHistory: {
          orderBy: {
            changedAt: 'desc',
          },
        },
        milestones: true,
        attachments: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto & { status?: TaskStatus }, userId: string) {
    const task = await this.findOne(id);

    // Only client can update task details
    if (task.clientId !== userId) {
      throw new BadRequestException('Only the task client can update task details');
    }

    const { status, ...updateData } = updateTaskDto;

    // If status is being updated, create a new status history entry
    if (status) {
      await this.prisma.statusHistory.create({
        data: {
          taskId: id,
          status,
          changedBy: userId,
        },
      });
      // Notify status change
      this.notificationsGateway.notifyTaskStatusChange(id, userId, status);
    }

    return this.prisma.task.update({
      where: { id },
      data: updateData,
      include: {
        client: true,
        worker: true,
        statusHistory: {
          orderBy: {
            changedAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  async assignTask(id: string, workerId: string, clientId: string) {
    const task = await this.findOne(id);

    if (task.clientId !== clientId) {
      throw new BadRequestException('Only the task client can assign workers');
    }

    if (task.status !== TaskStatus.OPEN) {
      throw new BadRequestException('Can only assign workers to OPEN tasks');
    }

    const worker = await this.prisma.user.findUnique({
      where: { id: workerId },
    });

    if (!worker || worker.role !== 'WORKER') {
      throw new BadRequestException('Invalid worker ID or user is not a worker');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        workerId,
        status: TaskStatus.ASSIGNED,
        statusHistory: {
          create: {
            status: TaskStatus.ASSIGNED,
            changedBy: clientId,
          },
        },
      },
      include: {
        client: true,
        worker: true,
        statusHistory: {
          orderBy: {
            changedAt: 'desc',
          },
          take: 1,
        },
      },
    });

    // Notify tasker
    this.notificationsGateway.notifyTaskAssigned(id, workerId);

    return updatedTask;
  }

  async completeTask(id: string, workerId: string) {
    const task = await this.findOne(id);

    if (task.workerId !== workerId) {
      throw new BadRequestException('Only the assigned worker can complete the task');
    }

    if (task.status !== TaskStatus.IN_PROGRESS) {
      throw new BadRequestException('Can only complete tasks that are IN_PROGRESS');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        status: TaskStatus.COMPLETED,
        statusHistory: {
          create: {
            status: TaskStatus.COMPLETED,
            changedBy: workerId,
          },
        },
      },
      include: {
        client: true,
        worker: true,
        statusHistory: {
          orderBy: {
            changedAt: 'desc',
          },
          take: 1,
        },
      },
    });

    // Notify reviewer
    this.notificationsGateway.notifyTaskCompleted(id, task.clientId);

    return updatedTask;
  }

  async addComment(id: string, content: string, userId: string) {
    const task = await this.findOne(id);

    return this.prisma.comment.create({
      data: {
        taskId: id,
        userId,
        content,
      },
      include: {
        user: true,
      },
    });
  }

  async addMilestone(id: string, milestoneData: {
    title: string;
    description?: string;
    dueDate: Date;
  }, userId: string) {
    const task = await this.findOne(id);

    if (task.clientId !== userId) {
      throw new BadRequestException('Only the task client can add milestones');
    }

    return this.prisma.milestone.create({
      data: {
        ...milestoneData,
        taskId: id,
      },
    });
  }

  async createTaskTemplate(createTemplateDto: CreateTaskTemplateDto, userId: string) {
    return this.prisma.taskTemplate.create({
      data: {
        ...createTemplateDto,
        createdBy: userId,
      },
    });
  }

  async getTaskTemplates(userId: string, includePublic: boolean = true) {
    return this.prisma.taskTemplate.findMany({
      where: {
        OR: [
          { createdBy: userId },
          ...(includePublic ? [{ isPublic: true }] : []),
        ],
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async createTaskFromTemplate(templateId: string, clientId: string, customizations?: Partial<CreateTaskDto>) {
    const template = await this.prisma.taskTemplate.findUnique({
      where: { id: templateId },
    });
    if (!template) throw new NotFoundException('Template not found');
    if (!template.isPublic && template.createdBy !== clientId) {
      throw new BadRequestException('You do not have access to this template');
    }
    const taskData: CreateTaskDto = {
      title: template.title,
      description: template.description,
      type: template.type,
      difficulty: template.difficulty,
      reward: 100, // Default reward if not provided in customizations
      category: template.category,
      tags: template.tags,
      priority: template.priority,
      estimatedTime: template.estimatedTime,
      ...customizations,
    };
    return this.create(taskData, clientId);
  }

  async bulkCreateTasks(bulkCreateDto: BulkCreateTasksDto, clientId: string) {
    const { tasks, workerIds } = bulkCreateDto;

    // If workerIds are provided, verify they are all valid workers
    if (workerIds?.length) {
      const workers = await this.prisma.user.findMany({
        where: {
          id: { in: workerIds },
          role: 'WORKER',
        },
      });

      if (workers.length !== workerIds.length) {
        throw new BadRequestException('One or more worker IDs are invalid');
      }
    }

    // Create tasks in a transaction
    return this.prisma.$transaction(async (prisma) => {
      const createdTasks = [];

      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const workerId = workerIds?.[i % workerIds.length]; // Distribute workers evenly

        const createdTask = await prisma.task.create({
          data: {
            ...task,
            clientId,
            workerId,
            statusHistory: {
              create: {
                status: TaskStatus.OPEN,
                changedBy: clientId,
              },
            },
          },
          include: {
            client: true,
            worker: true,
            statusHistory: true,
          },
        });

        createdTasks.push(createdTask);
      }

      return createdTasks;
    });
  }

  async updateTaskTemplate(templateId: string, updateData: Partial<CreateTaskTemplateDto>, userId: string) {
    const template = await this.prisma.taskTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new NotFoundException('Task template not found');
    }

    if (template.createdBy !== userId) {
      throw new BadRequestException('You can only update your own templates');
    }

    return this.prisma.taskTemplate.update({
      where: { id: templateId },
      data: updateData,
    });
  }

  async deleteTaskTemplate(templateId: string, userId: string) {
    const template = await this.prisma.taskTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      throw new NotFoundException('Task template not found');
    }

    if (template.createdBy !== userId) {
      throw new BadRequestException('You can only delete your own templates');
    }

    return this.prisma.taskTemplate.delete({
      where: { id: templateId },
    });
  }

  async getCompletionRate() {
    const total = await this.prisma.task.count();
    const completed = await this.prisma.task.count({ where: { status: 'COMPLETED' } });
    return {
      total,
      completed,
      completionRate: total ? completed / total : 0,
    };
  }

  async getAverageCompletionTime() {
    const completedTasks = await this.prisma.task.findMany({
      where: { status: 'COMPLETED', actualTime: { not: null } },
      select: { actualTime: true },
    });
    if (!completedTasks.length) return { averageMinutes: 0 };
    const totalMinutes = completedTasks.reduce((sum, t) => sum + (t.actualTime || 0), 0);
    return { averageMinutes: totalMinutes / completedTasks.length };
  }

  async getTaskDistribution() {
    const byStatus = await this.prisma.task.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const byType = await this.prisma.task.groupBy({
      by: ['type'],
      _count: { _all: true },
    });
    const byDifficulty = await this.prisma.task.groupBy({
      by: ['difficulty'],
      _count: { _all: true },
    });
    return { byStatus, byType, byDifficulty };
  }

  async getEarningsPerUser() {
    const earnings = await this.prisma.task.groupBy({
      by: ['workerId'],
      where: { status: 'COMPLETED', workerId: { not: null } },
      _sum: { reward: true },
    });
    return earnings;
  }
} 