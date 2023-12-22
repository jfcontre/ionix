import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRole: string = this.reflector.get(META_ROLES, context.getHandler())

    if (!validRole) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user

    if (!user)
      throw new BadRequestException('User not found');

    if (user.role === validRole) return true
    throw new ForbiddenException(
      `User ${user.username} need a valid role: [${validRole}]`
    );
  }
}