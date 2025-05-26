import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    // Initialization logic
  }

  handleConnection(client: any) {
    // Handle new client connection
  }

  handleDisconnect(client: any) {
    // Handle client disconnect
  }

  notifyTaskStatusChange(taskId: string, userId: string, status: string) {
    // Emit to a specific user (room)
    this.server.to(userId).emit('task-status-changed', { taskId, status });
  }

  notifyTaskAssigned(taskId: string, taskerId: string) {
    this.server.to(taskerId).emit('task-assigned', { taskId });
  }

  notifyTaskCompleted(taskId: string, reviewerId: string) {
    this.server.to(reviewerId).emit('task-completed', { taskId });
  }

  notifyReviewCreated(reviewId: string, workerId: string) {
    this.server.to(workerId).emit('review-created', { reviewId });
  }

  notifyReviewDisputed(reviewId: string, reviewerId: string) {
    this.server.to(reviewerId).emit('review-disputed', { reviewId });
  }
} 