import { CreateTaskChecklistItemDto } from './dto/create-task-checklist-item.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskChecklistItemsController {
    create(dto: CreateTaskChecklistItemDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
