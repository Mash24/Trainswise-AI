import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '@nexusloop/db';
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
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockNotificationsGateway = {
    notifyTaskStatusChange: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
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
        },
        include: {
          client: true,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          type: TaskType.TEXT_ANNOTATION,
          difficulty: TaskDifficulty.EASY,
          status: TaskStatus.OPEN,
          reward: 100,
          clientId: '1',
          deadline: new Date(),
          assignedToId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.task, 'findMany').mockResolvedValue(mockTasks);

      const result = await (service as any).findAll({});
      expect(result).toEqual(mockTasks);
      expect(prisma.task.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const taskId = 'task-id';
      const expectedTask = { id: taskId, title: 'Test Task' };

      mockPrismaService.task.findUnique.mockResolvedValue(expectedTask);

      const result = await service.findOne(taskId);
      expect(result).toEqual(expectedTask);
      expect(mockPrismaService.task.findUnique).toHaveBeenCalledWith({
        where: { id: taskId },
        include: {
          client: true,
          reviews: true,
          submissions: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskId = 'task-id';
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const expectedTask = { id: taskId, ...updateTaskDto };

      mockPrismaService.task.findUnique.mockResolvedValue({ id: taskId, clientId: 'client-id' });
      mockPrismaService.task.update.mockResolvedValue(expectedTask);

      const result = await service.update(taskId, updateTaskDto, 'client-id');
      expect(result).toEqual(expectedTask);
      expect(mockPrismaService.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: updateTaskDto,
        include: {
          client: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const taskId = 'task-id';
      const expectedTask = { id: taskId, title: 'Test Task' };

      mockPrismaService.task.findUnique.mockResolvedValue({ id: taskId, clientId: 'client-id' });
      mockPrismaService.task.delete.mockResolvedValue(expectedTask);

      const result = await service.remove(taskId, 'client-id');
      expect(result).toEqual(expectedTask);
      expect(mockPrismaService.task.delete).toHaveBeenCalledWith({
        where: { id: taskId },
      });
    });
  });
}); 