import { StatusTodo } from "@/constants/enums/todoStates"
import { User } from "./User"

export interface Todo {
  id: number
  title: string
  description: string
  dueDate: string
  comment: string
  status: StatusTodo
  executorId: number
  executor: User | null
}

export interface CreateTodoFormInput {
  id: number | null
  title: string
  description: string
  dueDate: string | Date
  executorId: number
}