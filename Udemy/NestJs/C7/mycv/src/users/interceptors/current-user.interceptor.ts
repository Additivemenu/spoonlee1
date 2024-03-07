import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  /**
   *
   * @param context " ExecutionContext is like a wrapper around incoming request"
   * @param handler "CallHandler is reference to a route handler"
   */
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user; // ! this is passing info to decorator
    }

    return handler.handle(); // proceed to route handler execution
  }
}
