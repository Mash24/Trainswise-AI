import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskStatusesController {
    create(dto: CreateTaskStatusDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
