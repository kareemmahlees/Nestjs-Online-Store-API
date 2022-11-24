import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { AssignedRoles } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<AssignedRoles[]>(
            ROLES_KEY,
            context.getHandler(),
        );
        // console.log('printed before first check');

        if (!requiredRole) return true;
        // console.log('printed after first check');
        const { user } = context.switchToHttp().getRequest();
        if (user.role === requiredRole) {
            return true;
        }
        // console.log(user);

        return false;
    }
}
