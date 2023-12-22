import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
  imports:[AuthModule]
})
export class UsersModule {}
