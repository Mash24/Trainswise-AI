import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskTemplatesController {
    create(dto: CreateTaskTemplateDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
