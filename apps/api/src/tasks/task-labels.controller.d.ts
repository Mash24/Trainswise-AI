import { CreateTaskLabelDto } from './dto/create-task-label.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskLabelsController {
    create(dto: CreateTaskLabelDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
