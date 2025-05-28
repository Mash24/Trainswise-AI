import { CreateTaskVoteDto } from './dto/create-task-vote.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskVotesController {
    create(dto: CreateTaskVoteDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
