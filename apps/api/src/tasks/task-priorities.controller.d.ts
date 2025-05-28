import { CreateTaskPriorityDto } from './dto/create-task-priority.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskPrioritiesController {
    create(dto: CreateTaskPriorityDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
