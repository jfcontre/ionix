import { SetMetadata } from '@nestjs/common';
import { AuthRole } from '../enums/auth-role.enum';

export const META_ROLES = 'roles';


export const RoleProtected = (args: AuthRole ) => {
    return SetMetadata( META_ROLES , args);
}