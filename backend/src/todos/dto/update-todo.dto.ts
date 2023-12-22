import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusTodo } from '../enums/status-todo.enum';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty()
  @IsEnum(StatusTodo)
  status:StatusTodo
}
