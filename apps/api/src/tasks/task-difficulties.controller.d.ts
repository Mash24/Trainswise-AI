import { CreateTaskDifficultyDto } from './dto/create-task-difficulty.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskDifficultiesController {
    create(dto: CreateTaskDifficultyDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
