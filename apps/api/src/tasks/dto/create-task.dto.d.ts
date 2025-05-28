import { TaskType, TaskDifficulty } from '@prisma/client';
export declare class CreateTaskDto {
    title: string;
    description: string;
    type: TaskType;
    difficulty: TaskDifficulty;
    reward: number;
    deadline?: Date;
    category?: string[];
    tags?: string[];
    estimatedTime?: number;
    workerId?: string;
}
