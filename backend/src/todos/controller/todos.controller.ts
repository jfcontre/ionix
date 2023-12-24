import { Controller, Get, Post, Body, Param, Delete, HttpException, UsePipes, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { TodosService } from '../service/todos.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { UserWithOutPassword } from 'src/auth/interfaces/user-without-password.interface';
import { Auth } from '../../auth/decorators/auth.decorator';
import { AuthRole } from '../../auth/enums/auth-role.enum';
import { UpdateStatusTodoDto } from '../dto/update-status-todo.dto';
import { LeaveCommentTodoDto } from '../dto/leave-comment-todo.dto';

@ApiTags('Todos')
@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  /**
   * Allows to create a todo
   * @param createTodoDto  The create todo information
   * @returns A todo created
   */
  @ApiOperation({ summary: 'Allows to create a todo' })
  @Post()
  @Auth(AuthRole.ADMIN)
  @UsePipes(ValidationPipe)
  async create(@Body() createTodoDto: CreateTodoDto) {
    const result = await this.todosService.create(createTodoDto);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return result.data
  }

  /**
   * Allows to get all todos
   * @returns A todo list
   **/
  @ApiOperation({ summary: 'Allows to get all todos' })
  @Get()
  async findAll(@GetUser() user: UserWithOutPassword) {
    const result = await this.todosService.findAll(user);
    return result.data
  }

  /**
   * Allows to get a todo by id
   * @returns A todo found
  **/
  @Get(':id')
  @ApiOperation({ summary: 'Allows to get one todo by id' })
  async findOne(@Param('id') id: string) {
    const result = await this.todosService.findOne(+id);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    const { status, ...resultWithoutStatus } = result;

    return resultWithoutStatus.data;
  }

  /**
  * Allows to update a todo
  * @returns A todo updated
  **/
  @Put(':id')
  @Auth(AuthRole.ADMIN)
  @ApiOperation({ summary: 'Allows to update a todo' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const result = await this.todosService.update(+id, updateTodoDto);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return result.data
  }

  /**
* Allows to update a todo
* @returns A todo updated
**/
  @Put('startTodo/:id')
  @ApiOperation({ summary: 'Allows to start  todo' })
  async startTodo(@Param('id') id: string) {
    const result = await this.todosService.startTodo(+id);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return result.data
  }

  /**
  * Allows to update status todo
  * @returns A todo updated
  **/
  @Put('updateStatusTodo/:id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Allows to update status todo' })
  async updateStatusTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateStatusTodoDto,
    @GetUser() user: UserWithOutPassword
  ) {
    const result = await this.todosService.updateTodoStatus(+id, updateTodoDto, user);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return result.data
  }

  /**
    * Allows to delete a todo
    * @returns A todo deleted
  **/
  @Delete(':id')
  @ApiOperation({ summary: 'Allows to delete a todo' })
  async remove(@Param('id') id: string) {
    const result = await this.todosService.remove(+id);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    const { status, ...resultWithoutStatus } = result;

    return resultWithoutStatus;
  }

  /**
* Allows to leave a comment in todo
* @returns A todo updated
**/
  @Put('leaveComment/:id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Allows to leave comment in todo' })
  async leaveCommentTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: LeaveCommentTodoDto,
    @GetUser() user: UserWithOutPassword
  ) {
    const result = await this.todosService.leaveComment(+id, updateTodoDto, user);
    if (!result.status) {
      throw new HttpException(result.message, result.code)
    }
    return result.data
  }
}
