import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // data is the arg we provided for this decorator
  // context is like a wrapper around incoming request
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;     // ! this will be the param in controller when using this decorator
  },
);
