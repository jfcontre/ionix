import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LeaveCommentTodoDto {
  @ApiProperty()
  @IsString()
  comment: string
}
