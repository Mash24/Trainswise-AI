import { CreateTaskDependencyDto } from './dto/create-task-dependency.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskDependenciesController {
    create(dto: CreateTaskDependencyDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
