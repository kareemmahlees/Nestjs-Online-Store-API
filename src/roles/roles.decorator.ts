import { SetMetadata } from '@nestjs/common';
import { AssignedRoles } from './roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (role: AssignedRoles) => SetMetadata(ROLES_KEY, role);
