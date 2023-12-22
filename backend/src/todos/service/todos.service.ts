import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { PrismaService } from '../../prisma.service';
import { ServiceResult } from '../../common/ServiceResult';
import { TodoDto } from '../dto/todo.dto';
import { UserWithOutPassword } from 'src/auth/interfaces/user-without-password.interface';
import { StatusTodo } from '../enums/status-todo.enum';
@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) { }

  async create(createTodoDto: CreateTodoDto): Promise<ServiceResult<TodoDto>> {
    const result = new ServiceResult<TodoDto>()

    const todo = await this.prisma.todos.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        dueDate: new Date(createTodoDto.dueDate),
        status: StatusTodo.ASSIGNED,
        executorId: createTodoDto.executorId
      },
      select: {
        id: true,
        description: true,
        title: true,
        dueDate: true,
        comment: true,
        status: true,
        executorId: true,
        executor: {
          select: {
            id: true,
            username: true,
            status: true
          }
        }
      }
    });

    result.data = { ...todo }
    result.status = true;
    result.code = HttpStatus.CREATED
    return result
  }

  async findAll(user: UserWithOutPassword): Promise<ServiceResult<TodoDto[]>> {
    const result = new ServiceResult<TodoDto[]>()

    const todos = await this.prisma.todos.findMany({
      where: user.role !== 'ADMIN' ? { executorId: user.id } : {},
      select: {
        id: true,
        description: true,
        title: true,
        dueDate: true,
        comment: true,
        status: true,
        executorId: true,
        executor: {
          select: {
            id: true,
            username: true,
            status: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    result.status = true
    result.data = [...todos]
    return result
  }

  async findOne(id: number): Promise<ServiceResult<TodoDto>> {
    const result = new ServiceResult<TodoDto>()
    const todo = await this.prisma.todos.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        description: true,
        title: true,
        dueDate: true,
        comment: true,
        status: true,
        executor: {
          select: {
            id: true,
            username: true,
            status: true
          }
        },
        executorId: true
      }
    })

    if (todo === null) {
      result.code = HttpStatus.NOT_FOUND
      result.message = "Todo not found"

      return result
    }

    result.status = true;
    result.data = { ...todo }
    return result
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const result = new ServiceResult<TodoDto>()
    const todo = await this.prisma.todos.findFirst({
      where: {
        id
      }
    })

    if (todo === null) {
      result.code = HttpStatus.NOT_FOUND
      result.message = "Todo not found"

      return result
    }
    await this.prisma.todos.update({
      where: {
        id
      }, data: {
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        dueDate: new Date(updateTodoDto.dueDate),
        status: updateTodoDto.status,
        executorId: updateTodoDto.executorId
      }
    })
    const newTodo = await this.prisma.todos.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        description: true,
        title: true,
        dueDate: true,
        comment: true,
        status: true,
        executorId: true,
        executor: {
          select: {
            id: true,
            username: true,
            status: true
          }
        }
      },
    })

    result.data = newTodo
    result.status = true
    return result
  }

  async remove(id: number): Promise<ServiceResult<TodoDto>> {
    const result = new ServiceResult<TodoDto>()
    const todo = await this.prisma.todos.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        description: true,
        title: true,
        dueDate: true,
        comment: true,
        status: true,
        executorId: true,
        executor: {
          select: {
            id: true,
            username: true,
            status: true
          }
        }
      },
    })

    if (todo === null) {
      result.code = HttpStatus.NOT_FOUND
      result.message = "Todo not found"

      return result
    }

    await this.prisma.todos.delete({
      where: {
        id
      }
    })

    result.status = true;
    result.data = { ...todo }
    return result
  }

  async startTodo(id: number): Promise<ServiceResult<TodoDto>> {
    const result = new ServiceResult<TodoDto>()
    const todo = await this.prisma.todos.findFirst({
      where: {
        id
      }
    })

    if (todo === null) {
      result.code = HttpStatus.NOT_FOUND
      result.message = "Todo not found"

      return result
    }

    const todoUpdate = await this.prisma.todos.update({
      where: {
        id
      }, data: {
        status: 'INITIATED'
      },
      select: {
        id: true,
        description: true,
        title: true,
        dueDate: true,
        comment: true,
        status: true,
        executorId: true,
        executor: {
          select: {
            id: true,
            username: true,
            status: true
          }
        }
      },
    })

    result.status = true;
    result.data = { ...todoUpdate }
    return result
  }
}
