import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN'
}

export class CreateTaskVoteDto {
  @ApiProperty({ description: 'The ID of the task being voted on' })
  @IsUUID()
  taskId: string = '';

  @ApiProperty({ description: 'The type of vote', enum: VoteType })
  @IsEnum(VoteType)
  type: VoteType = VoteType.UP;

  @ApiProperty({ description: 'Optional comment with the vote', required: false })
  @IsOptional()
  comment?: string;
} 