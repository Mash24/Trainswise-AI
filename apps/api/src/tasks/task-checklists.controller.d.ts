import { CreateTaskChecklistDto } from './dto/create-task-checklist.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskChecklistsController {
    create(dto: CreateTaskChecklistDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
