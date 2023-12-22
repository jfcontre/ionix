import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;
}