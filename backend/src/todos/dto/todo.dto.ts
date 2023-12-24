import { StatusTodo } from "@prisma/client"
import { IsString } from "class-validator"
export class TodoDto {
  id: number
  @IsString()
  title: string

  @IsString()
  description: string

  dueDate: Date | string
  status: StatusTodo
  executorId: number
  executor: any
  comment: string
}
