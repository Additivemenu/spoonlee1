// composite-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class CompositeAuthGuard implements CanActivate {
  constructor(
    private authGuard: AuthGuard,
    private rolesGuard: RolesGuard,
  ) {}

  // ! the order of the guards is important
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      (await this.authGuard.canActivate(context)) &&
      (await this.rolesGuard.canActivate(context))
    );
  }
}
