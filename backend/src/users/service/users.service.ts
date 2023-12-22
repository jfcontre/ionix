import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  /**
  * Allows get all users executors
  * @returns A list of user executors 
  */
  async findAllUsersExecutors() {
    return await this.prisma.users.findMany({
      where: { status: 'ACTIVE', role: 'EXECUTOR' },
      select: {
        id: true,
        role: true,
        username: true,
        status: true
      }
    })
  }
}
