import { TaskType, TaskDifficulty } from '@prisma/client';
export declare class CreateTaskTemplateDto {
    title: string;
    description: string;
    type: TaskType;
    difficulty: TaskDifficulty;
    category?: string[];
    tags?: string[];
    estimatedTime?: number;
    isPublic?: boolean;
}
