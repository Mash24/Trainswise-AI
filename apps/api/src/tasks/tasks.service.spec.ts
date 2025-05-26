import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus, TaskType, TaskDifficulty } from '@prisma/client';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;
  let notificationsGateway: NotificationsGateway;

  const mockPrismaService = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    statusHistory: {
      create: jest.fn(),
    },
  };

  const mockNotificationsGateway = {
    notifyTaskStatusChange: jest.fn(),
    notifyTaskAssigned: jest.fn(),
    notifyTaskCompleted: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: NotificationsGateway, useValue: mockNotificationsGateway },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
    notificationsGateway = module.get<NotificationsGateway>(NotificationsGateway);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        type: TaskType.IMAGE_ANNOTATION,
        difficulty: TaskDifficulty.EASY,
        reward: 100
      };
      const clientId = 'client-id';
      const expectedTask = { id: 'task-id', ...createTaskDto, clientId };

      mockPrismaService.task.create.mockResolvedValue(expectedTask);

      const result = await service.create(createTaskDto, clientId);
      expect(result).toEqual(expectedTask);
      expect(mockPrismaService.task.create).toHaveBeenCalledWith({
        data: {
          ...createTaskDto,
          clientId,
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
    });
  });

  describe('assignTask', () => {
    it('should assign a task to a worker', async () => {
      const taskId = 'task-id';
      const workerId = 'worker-id';
      const clientId = 'client-id';
      const expectedTask = { id: taskId, workerId, status: TaskStatus.ASSIGNED };

      mockPrismaService.task.findUnique.mockResolvedValue({ id: taskId, clientId, status: TaskStatus.OPEN });
      mockPrismaService.user.findUnique.mockResolvedValue({ id: workerId, role: 'WORKER' });
      mockPrismaService.task.update.mockResolvedValue(expectedTask);

      const result = await service.assignTask(taskId, workerId, clientId);
      expect(result).toEqual(expectedTask);
      expect(mockNotificationsGateway.notifyTaskAssigned).toHaveBeenCalledWith(taskId, workerId);
    });
  });

  describe('completeTask', () => {
    it('should mark a task as completed', async () => {
      const taskId = 'task-id';
      const workerId = 'worker-id';
      const clientId = 'client-id';
      const expectedTask = { id: taskId, status: TaskStatus.COMPLETED };

      mockPrismaService.task.findUnique.mockResolvedValue({ id: taskId, workerId, clientId, status: TaskStatus.IN_PROGRESS });
      mockPrismaService.task.update.mockResolvedValue(expectedTask);

      const result = await service.completeTask(taskId, workerId);
      expect(result).toEqual(expectedTask);
      expect(mockNotificationsGateway.notifyTaskCompleted).toHaveBeenCalledWith(taskId, clientId);
    });
  });

  describe('getCompletionRate', () => {
    it('should return task completion rate', async () => {
      const total = 10;
      const completed = 5;
      const expectedRate = { total, completed, completionRate: completed / total };

      mockPrismaService.task.count.mockResolvedValueOnce(total);
      mockPrismaService.task.count.mockResolvedValueOnce(completed);

      const result = await service.getCompletionRate();
      expect(result).toEqual(expectedRate);
    });
  });

  describe('getAverageCompletionTime', () => {
    it('should return average task completion time', async () => {
      const completedTasks = [{ actualTime: 10 }, { actualTime: 20 }];
      const expectedTime = { averageMinutes: 15 };

      mockPrismaService.task.findMany.mockResolvedValue(completedTasks);

      const result = await service.getAverageCompletionTime();
      expect(result).toEqual(expectedTime);
    });
  });

  describe('getTaskDistribution', () => {
    it('should return task distribution', async () => {
      const byStatus = [{ status: 'OPEN', _count: { _all: 5 } }];
      const byType = [{ type: 'TYPE1', _count: { _all: 3 } }];
      const byDifficulty = [{ difficulty: 'EASY', _count: { _all: 2 } }];
      const expectedDistribution = { byStatus, byType, byDifficulty };

      mockPrismaService.task.groupBy.mockResolvedValueOnce(byStatus);
      mockPrismaService.task.groupBy.mockResolvedValueOnce(byType);
      mockPrismaService.task.groupBy.mockResolvedValueOnce(byDifficulty);

      const result = await service.getTaskDistribution();
      expect(result).toEqual(expectedDistribution);
    });
  });

  describe('getEarningsPerUser', () => {
    it('should return earnings per user', async () => {
      const earnings = [{ workerId: 'worker-id', _sum: { reward: 100 } }];

      mockPrismaService.task.groupBy.mockResolvedValue(earnings);

      const result = await service.getEarningsPerUser();
      expect(result).toEqual(earnings);
    });
  });
}); 