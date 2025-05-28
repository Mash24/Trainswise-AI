import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    notifyTaskStatusChange(taskId: string, userId: string, status: string): void;
    notifyTaskAssigned(taskId: string, taskerId: string): void;
    notifyTaskCompleted(taskId: string, reviewerId: string): void;
    notifyReviewCreated(reviewId: string, workerId: string): void;
    notifyReviewDisputed(reviewId: string, reviewerId: string): void;
}
