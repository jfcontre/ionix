import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { PrismaService } from '../../prisma.service';
import { ServiceResult } from '../../common/ServiceResult';
import { TodoDto } from '../dto/todo.dto';
import { UserWithOutPassword } from 'src/auth/interfaces/user-without-password.interface';
import { StatusTodo } from '../enums/status-todo.enum';
import { UpdateStatusTodoDto } from '../dto/update-status-todo.dto';
import { AuthRole } from 'src/auth/enums/auth-role.enum';
import { LeaveCommentTodoDto } from '../dto/leave-comment-todo.dto';
import { dueDateHasPassed } from 'src/common/dateUtil';
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
      where: user.role !== AuthRole.ADMIN ? { executorId: user.id } : {},
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
        status: StatusTodo.INITIATED
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

  async updateTodoStatus(id: number, updateTodoDto: UpdateStatusTodoDto, user: UserWithOutPassword): Promise<ServiceResult<TodoDto>> {
    const result = new ServiceResult<TodoDto>();

    const todo = await this.prisma.todos.findFirst({
      where: {
        id
      }
    });

    if (todo === null) {
      result.code = HttpStatus.NOT_FOUND;
      result.message = "Todo not found";
      return result;
    }

    if (todo.status === StatusTodo.FINISHED_ERROR || todo.status === StatusTodo.FINISHED_SUCCESS) {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = "You cannot edit a Todo that has already been finished";
      return result;
    }

    if (user.role === AuthRole.EXECUTOR && todo.executorId !== user.id) {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = "The todo does not belong to the designated executor";
      return result;

    }

    const todoUpdate = await this.prisma.todos.update({
      where: user.role !== AuthRole.ADMIN ? { id, executorId: user.id } : { id },
      data: {
        status: updateTodoDto.status
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
    });

    result.status = true;
    result.data = { ...todoUpdate };
    return result;
  }

  async leaveComment(id: number, leaveCommentTodoDto: LeaveCommentTodoDto, user: UserWithOutPassword) {
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

    if (!dueDateHasPassed(todo.dueDate)) {
      result.code = HttpStatus.BAD_REQUEST
      result.message = "The todo has not yet expired"

      return result
    }

    if (todo.status === StatusTodo.FINISHED_ERROR || todo.status === StatusTodo.FINISHED_SUCCESS) {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = "You cannot edit a Todo that has already been finished";
      return result;
    }

    if (user.role === AuthRole.EXECUTOR && todo.executorId !== user.id) {
      result.code = HttpStatus.BAD_REQUEST;
      result.message = "The todo does not belong to the designated executor";
      return result;

    }


    await this.prisma.todos.update({
      where: {
        id
      }, data: {
        comment: leaveCommentTodoDto.comment,
      }
    })
    const newTodo = await this.prisma.todos.findFirst({
      where: user.role !== AuthRole.ADMIN ? { id, executorId: user.id } : { id },
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
}
