import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskTypesController {
    create(dto: CreateTaskTypeDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
