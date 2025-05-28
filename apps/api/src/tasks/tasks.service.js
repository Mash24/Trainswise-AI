"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let TasksService = class TasksService {
    constructor(prisma, notificationsGateway) {
        this.prisma = prisma;
        this.notificationsGateway = notificationsGateway;
    }
    async create(createTaskDto, clientId) {
        const task = await this.prisma.task.create({
            data: {
                ...createTaskDto,
                clientId,
            },
            include: {
                client: true,
            },
        });
        return task;
    }
    async findAll(filters) {
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
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                client: true,
                submissions: true,
                reviews: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto, userId) {
        const task = await this.findOne(id);
        // Only client can update task details
        if (task.clientId !== userId) {
            throw new common_1.BadRequestException('Only the task client can update task details');
        }
        const { status, ...updateData } = updateTaskDto;
        // If status is being updated, you may want to handle status history here
        // ...
        return this.prisma.task.update({
            where: { id },
            data: updateData,
            include: {
                client: true,
            },
        });
    }
    async remove(id, userId) {
        const task = await this.findOne(id);
        // Only client can delete task
        if (task.clientId !== userId) {
            throw new common_1.BadRequestException('Only the task client can delete the task');
        }
        return this.prisma.task.delete({
            where: { id },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_gateway_1.NotificationsGateway])
], TasksService);
