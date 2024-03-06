import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/users/dtos/user.dto';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

// a custom decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {} // dependency injection

  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: any) => {
        // ! data is the return value from the handler. but not yet serialized
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // setup: only @Expose() fields will be returned
        });
      }),
    );
  }
}
