import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  email: string = '';

  @ApiProperty({ description: 'The password for the user account' })
  @IsString()
  @MinLength(8)
  password: string = '';

  @ApiProperty({ description: 'The full name of the user' })
  @IsString()
  name: string = '';
} 