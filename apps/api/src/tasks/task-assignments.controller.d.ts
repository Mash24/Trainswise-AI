import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskAssignmentsController {
    create(dto: CreateTaskAssignmentDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
