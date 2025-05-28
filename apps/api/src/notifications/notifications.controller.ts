import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Request as ExpressRequest } from 'express';

@Controller('notifications')
export class NotificationsController {
  @Get()
  findAll(@Request() req: ExpressRequest) {
    // Implementation
  }

  @Post(':id/read')
  markAsRead(@Param('id') id: string, @Request() req: ExpressRequest) {
    // Implementation
  }

  @Post(':id/unread')
  markAsUnread(@Param('id') id: string, @Request() req: ExpressRequest) {
    // Implementation
  }
} 