import { CreateTaskTagDto } from './dto/create-task-tag.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskTagsController {
    create(dto: CreateTaskTagDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
