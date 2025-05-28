import { IsNumber, IsNotEmpty, Min, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawalRequestDto {
  @ApiProperty({ description: 'The amount to withdraw' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'The withdrawal method', required: false })
  @IsString()
  @IsOptional()
  method?: string;

  @ApiProperty({ description: 'Additional withdrawal details', required: false })
  @IsOptional()
  metadata?: Record<string, any>;
} 