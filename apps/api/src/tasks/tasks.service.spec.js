"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tasks_service_1 = require("./tasks.service");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
const client_1 = require("@prisma/client");
describe('TasksService', () => {
    let service;
    let prisma;
    let notificationsGateway;
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
        const module = await testing_1.Test.createTestingModule({
            providers: [
                tasks_service_1.TasksService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
                { provide: notifications_gateway_1.NotificationsGateway, useValue: mockNotificationsGateway },
            ],
        }).compile();
        service = module.get(tasks_service_1.TasksService);
        prisma = module.get(prisma_service_1.PrismaService);
        notificationsGateway = module.get(notifications_gateway_1.NotificationsGateway);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a task', async () => {
            const createTaskDto = {
                title: 'Test Task',
                description: 'Test Description',
                type: client_1.TaskType.IMAGE_ANNOTATION,
                difficulty: client_1.TaskDifficulty.EASY,
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
            const expectedTasks = [
                { id: 'task-1', title: 'Task 1' },
                { id: 'task-2', title: 'Task 2' },
            ];
            mockPrismaService.task.findMany.mockResolvedValue(expectedTasks);
            const result = await service.findAll({ clientId: 'client-id' });
            expect(result).toEqual(expectedTasks);
            expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
                where: { clientId: 'client-id' },
                include: {
                    client: true,
                },
            });
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
                },
            });
        });
    });
    describe('update', () => {
        it('should update a task', async () => {
            const taskId = 'task-id';
            const updateTaskDto = { title: 'Updated Task' };
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
