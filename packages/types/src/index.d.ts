export * from './auth.types';
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Task {
    id: string;
    title: string;
    description: string;
    type: TaskType;
    difficulty: TaskDifficulty;
    reward: number;
    deadline?: Date;
    category?: string[];
    tags?: string[];
    estimatedTime?: number;
    clientId: string;
    assignedToId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum TaskType {
    DEVELOPMENT = "DEVELOPMENT",
    DESIGN = "DESIGN",
    WRITING = "WRITING",
    RESEARCH = "RESEARCH",
    OTHER = "OTHER"
}
export declare enum TaskDifficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}
export declare enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
