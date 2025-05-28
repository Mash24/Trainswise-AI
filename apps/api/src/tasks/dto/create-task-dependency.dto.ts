import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DependencyType {
  BLOCKS = 'BLOCKS',
  BLOCKED_BY = 'BLOCKED_BY',
  RELATES_TO = 'RELATES_TO'
}

export class CreateTaskDependencyDto {
  @ApiProperty({ description: 'The ID of the source task' })
  @IsUUID()
  sourceTaskId: string = '';

  @ApiProperty({ description: 'The ID of the target task' })
  @IsUUID()
  targetTaskId: string = '';

  @ApiProperty({ description: 'The type of dependency', enum: DependencyType })
  @IsEnum(DependencyType)
  type: DependencyType = DependencyType.BLOCKS;

  @ApiProperty({ description: 'Optional description of the dependency', required: false })
  @IsOptional()
  description?: string;
} 