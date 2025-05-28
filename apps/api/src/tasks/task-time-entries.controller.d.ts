import { CreateTaskTimeEntryDto } from './dto/create-task-time-entry.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskTimeEntriesController {
    create(dto: CreateTaskTimeEntryDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
