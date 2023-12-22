import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TodosModule, AuthModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
