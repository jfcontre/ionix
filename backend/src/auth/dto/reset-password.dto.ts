import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;
}