import { Request as ExpressRequest } from 'express';
export declare class NotificationsController {
    findAll(req: ExpressRequest): void;
    markAsRead(id: string, req: ExpressRequest): void;
    markAsUnread(id: string, req: ExpressRequest): void;
}
