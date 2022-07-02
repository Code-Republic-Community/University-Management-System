import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/constatns/role.enum';

export const Role_key = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(Role_key, roles);
