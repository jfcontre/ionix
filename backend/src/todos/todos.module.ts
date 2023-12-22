import { Module } from '@nestjs/common';
import { TodosService } from './service/todos.service';
import { TodosController } from './controller/todos.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService,PrismaService],
  imports:[AuthModule]
})
export class TodosModule {}
