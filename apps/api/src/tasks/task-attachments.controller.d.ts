import { CreateTaskAttachmentDto } from './dto/create-task-attachment.dto';
import { Request as ExpressRequest } from 'express';
export declare class TaskAttachmentsController {
    create(dto: CreateTaskAttachmentDto, req: ExpressRequest): void;
    findAll(req: ExpressRequest): void;
    findOne(id: string, req: ExpressRequest): void;
}
