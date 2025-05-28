import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Request as ExpressRequest } from 'express';
export declare class SubmissionsController {
    create(dto: CreateSubmissionDto, req: ExpressRequest): void;
    approve(id: string, req: ExpressRequest): void;
    reject(id: string, req: ExpressRequest): void;
}
