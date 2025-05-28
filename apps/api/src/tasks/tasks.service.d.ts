import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus, TaskType, TaskDifficulty } from '@prisma/client';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class TasksService {
    private prisma;
    private notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    create(createTaskDto: CreateTaskDto, clientId: string): Promise<{
        client: {
            email: string;
            password: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.TaskType;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        difficulty: import(".prisma/client").$Enums.TaskDifficulty;
        reward: number;
        deadline: Date | null;
        assignedToId: string | null;
        clientId: string;
    }>;
    findAll(filters: {
        status?: TaskStatus;
        type?: TaskType;
        difficulty?: TaskDifficulty;
        clientId?: string;
        assignedToId?: string;
    }): Promise<({
        client: {
            email: string;
            password: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.TaskType;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        difficulty: import(".prisma/client").$Enums.TaskDifficulty;
        reward: number;
        deadline: Date | null;
        assignedToId: string | null;
        clientId: string;
    })[]>;
    findOne(id: string): Promise<{
        submissions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            content: string;
            taskId: string;
            status: import(".prisma/client").$Enums.SubmissionStatus;
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            submissionId: string;
            reviewerId: string;
            feedback: string;
            score: number;
            taskId: string;
        }[];
        client: {
            email: string;
            password: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.TaskType;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        difficulty: import(".prisma/client").$Enums.TaskDifficulty;
        reward: number;
        deadline: Date | null;
        assignedToId: string | null;
        clientId: string;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto & {
        status?: TaskStatus;
    }, userId: string): Promise<{
        client: {
            email: string;
            password: string;
            name: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.TaskType;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        difficulty: import(".prisma/client").$Enums.TaskDifficulty;
        reward: number;
        deadline: Date | null;
        assignedToId: string | null;
        clientId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.TaskType;
        status: import(".prisma/client").$Enums.TaskStatus;
        title: string;
        difficulty: import(".prisma/client").$Enums.TaskDifficulty;
        reward: number;
        deadline: Date | null;
        assignedToId: string | null;
        clientId: string;
    }>;
}
