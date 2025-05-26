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
  priority: TaskPriority;
  reward: number;
  deadline?: Date;
  category?: string[];
  tags?: string[];
  estimatedTime?: number;
  workerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskType {
  DEVELOPMENT = 'DEVELOPMENT',
  DESIGN = 'DESIGN',
  WRITING = 'WRITING',
  RESEARCH = 'RESEARCH',
  OTHER = 'OTHER'
}

export enum TaskDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
} 