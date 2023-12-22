import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { AuthRole } from '../enums/auth-role.enum';


export function Auth(role: AuthRole) {

  return applyDecorators(
    RoleProtected(role),
    UseGuards( AuthGuard(), UserRoleGuard ),
  );

}