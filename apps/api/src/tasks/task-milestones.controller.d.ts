import { CreateTaskMilestoneDto } from './dto/create-task-milestone.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskMilestonesController {
    create(dto: CreateTaskMilestoneDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
