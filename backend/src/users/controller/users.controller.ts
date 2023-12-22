import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
 * Allows to get all users executors
 * @returns A list with users executors 
 */
  @Get("getExecutors")
  @ApiOperation({ summary: 'Allows to get all users executor' })
  findAll() {
    return this.usersService.findAllUsersExecutors();
  }
}
