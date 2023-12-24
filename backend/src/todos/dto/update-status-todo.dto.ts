import { ApiProperty } from '@nestjs/swagger';
import { StatusTodo } from '../enums/status-todo.enum';
import { IsEnum } from 'class-validator';

export class UpdateStatusTodoDto {
  @ApiProperty({ enum: StatusTodo })
  @IsEnum(StatusTodo)
  status: StatusTodo
}
