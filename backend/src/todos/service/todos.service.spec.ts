
import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { PrismaService } from '../../prisma.service';
import { HttpStatus } from '@nestjs/common';
import { TodoDto } from '../dto/todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { UserWithOutPassword } from 'src/auth/interfaces/user-without-password.interface';
import { StatusTodo } from '../enums/status-todo.enum';

describe('TodosService', () => {
  let service: TodosService;
  let prismaService: PrismaService;

  const mockTodo: TodoDto = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    dueDate: new Date(),
    status: StatusTodo.ASSIGNED,
    executorId: 1,
    comment: 'Test Comment',
    executor: {
      id: 1,
      username: 'testuser',
      status: 'active'
    }
  };

  const mockPrismaService = {
    todos: {
      create: jest.fn().mockResolvedValue(mockTodo),
      findMany: jest.fn().mockResolvedValue([mockTodo]),
      findFirst: jest.fn().mockResolvedValue(mockTodo),
      update: jest.fn().mockResolvedValue(mockTodo),
      delete: jest.fn().mockResolvedValue(mockTodo),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const createTodoDto: CreateTodoDto = {
      title: 'Test Todo',
      description: 'Test Description',
      dueDate: new Date().toISOString(),
      executorId: 1,
    };
    const result = await service.create(createTodoDto);
    expect(result.data).toEqual(mockTodo);
    expect(result.status).toBe(true);
    expect(result.code).toBe(HttpStatus.CREATED);
  });

  it('should return an array of todos', async () => {
    const user: UserWithOutPassword = {
      id: 1,
      username: 'testuser',
      role: 'USER',
      status:''
    };
    const result = await service.findAll(user);
    expect(result.data).toEqual([mockTodo]);
    expect(result.status).toBe(true);
  });

  it('should return a single todo', async () => {
    const result = await service.findOne(1);
    expect(result.data).toEqual(mockTodo);
    expect(result.status).toBe(true);
  });

  it('should update a todo', async () => {
    const updateTodoDto: UpdateTodoDto = {
      title: 'Updated Test Todo',
      description: 'Updated Test Description',
      dueDate: new Date().toISOString(),
      status: StatusTodo.ASSIGNED,
      executorId: 1,
    };
    const result = await service.update(1, updateTodoDto);
    expect(result.data).toEqual(mockTodo);
    expect(result.status).toBe(true);
  });

  it('should remove a todo', async () => {
    const result = await service.remove(1);
    expect(result.status).toBe(true);
  });

  it('should start a todo', async () => {
    const startedTodo = { ...mockTodo, status: StatusTodo.INITIATED };
    mockPrismaService.todos.update.mockResolvedValue(startedTodo);
    const result = await service.startTodo(1);
    expect(result.data.status).toBe(StatusTodo.INITIATED);
    expect(result.status).toBe(true);
  });
});