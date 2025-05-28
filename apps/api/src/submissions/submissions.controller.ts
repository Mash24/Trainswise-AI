import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/guards/jwt-auth.guard';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionsService.create(req.user.id, createSubmissionDto);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.submissionsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.submissionsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Req() req: RequestWithUser, @Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(req.user.id, id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.submissionsService.remove(req.user.id, id);
  }
} 