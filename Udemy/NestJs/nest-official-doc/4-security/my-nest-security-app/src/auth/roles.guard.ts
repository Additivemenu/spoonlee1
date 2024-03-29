import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

/**
 * the guard used for RBAC
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get metadata from the route handler
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    // check if the incoming user request has the required roles
    const { user } = context.switchToHttp().getRequest(); // req.user is the payload from the JWT token
    return requiredRoles.some((role) => user.roles?.includes(role)); // ! when is roles attached to user? - attached in AuthGuard
  }
}
