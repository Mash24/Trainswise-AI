import { CreateTaskWatcherDto } from './dto/create-task-watcher.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskWatchersController {
    create(dto: CreateTaskWatcherDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
