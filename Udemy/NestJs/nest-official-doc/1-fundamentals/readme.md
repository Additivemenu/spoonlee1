1













# Injection Scope

https://docs.nestjs.com/fundamentals/injection-scopes

For people coming from different programming language backgrounds, it might be unexpected to learn that in Nest, almost everything is shared across incoming requests. We have a connection pool to the database, singleton services with global state, etc. Remember that Node.js doesn't follow the request/response Multi-Threaded Stateless Model in which every request is processed by a separate thread. Hence, using singleton instances is fully **safe** for our applications.

However, there are edge cases when request-based lifetime may be the desired behavior, for instance, per-request caching in GraphQL applications, request tracking, and multi-tenancy. Injection scopes provide a mechanism to obtain the desired provider lifetime behavior.



A provider can have any of the following scopes:

| `DEFAULT`   | A single instance of the provider is shared across the entire application. The instance lifetime is tied directly to the application lifecycle. Once the application has bootstrapped, all singleton providers have been instantiated. Singleton scope is used by default. |
| ----------- | ------------------------------------------------------------ |
| `REQUEST`   | A new instance of the provider is created exclusively for each incoming **request**. The instance is garbage-collected after the request has completed processing. |
| `TRANSIENT` | Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance. |









# :bangbang: ​Execution Context

https://docs.nestjs.com/fundamentals/execution-context



Nest provides several utility classes that help make it easy to write applications that function across multiple application contexts (e.g., Nest HTTP server-based, microservices and WebSockets application contexts). These utilities provide information about the current execution context which can be used to build generic [guards](https://docs.nestjs.com/guards), [filters](https://docs.nestjs.com/exception-filters), and [interceptors](https://docs.nestjs.com/interceptors) that can work across a broad set of controllers, methods, and execution contexts.

We cover two such classes in this chapter: `ArgumentsHost` and `ExecutionContext`. These classes are part of the reason why NestJS is considered an extensible, platform-agnostic framework. They abstract away the underlying platform details (such as HTTP server specifics), allowing developers to write generic, reusable application logic that remains consistent across different types of applications (e.g., traditional web apps, microservices, WebSocket apps).



## ArgumentsHost class

`ArgumentsHost` is a class used primarily in `exception filters` and `pipes`. 

+ It provides methods to access the arguments passed to the original handler (controller method) and the context of the execution. Most importantly, it offers a way to access the underlying request and response objects (or equivalents in non-HTTP-based applications, like WebSockets and Microservices).
+  `ArgumentsHost` is also used to create a new instance of `ExecutionContext` for the current execution process.



### :gem: exception filter e.g. ​

A common use case for `ArgumentsHost` is within an exception filter to access the request and response objects to send a custom error response:

```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

```







## ExecutionContext class

`ExecutionContext` extends `ArgumentsHost` with additional methods specific to the execution context of the current process. It is used in `guards` and `interceptors` to provide detailed context about the execution process, including the currently executed handler (controller method), the class that declares the handler, and the specific type of the current process (HTTP, RPC, or WS). This detailed context allows for more granular control and decision-making based on the execution context.



### capabilities over `ArgumentHost`

Here are the capabilities `ExecutionContext` offers beyond `ArgumentsHost`:

Type of Execution

- **getType()**: This method returns the type of the current process. It can be one of `'http'`, `'rpc'`, or `'ws'` indicating whether the current execution context is for an HTTP request, a microservice (RPC), or a WebSocket event, respectively. This allows developers to write conditionals based on the type of request being handled.

Controller and Handler Access

- **getClass()**: This method returns the constructor of the class (usually a controller) where the current handler (method being executed) is defined. This is useful for applying logic based on the controller itself, such as applying security rules or logging based on the controller class.
  
- **getHandler()**: This method returns a reference to the handler (method) that is being executed. This allows for introspection and logic based on the specific route handler, such as fetching custom metadata defined on the handler with decorators.

These additional methods make `ExecutionContext` particularly useful for implementing logic that varies based on the context of the application's execution, such as determining which controller or method is being called, or handling requests differently based on whether they are HTTP, WebSocket, or microservices (RPC) calls.



### :gem: interceptor ​e.g.

Consider an interceptor that logs request details, including whether the request is HTTP or WebSocket and which controller and method handled the request:

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const type = context.getType();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    
    console.log(`Handling ${type} request in ${className}.${handlerName}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Finished handling ${type} request in ${className}.${handlerName} in ${Date.now() - now}ms`))
      );
}
```

In this example, `ExecutionContext` is used to:

1. Determine the type of the request (`getType()`).
2. Access the class name of the controller handling the request (`getClass().name`).
3. Access the name of the handler method that is processing the request (`getHandler().name`).

These capabilities allow for more nuanced and informed logic within guards, interceptors, and middleware, facilitating more sophisticated request handling strategies that take into account the full context of the execution environment.





### :gem: guard e.g.​

A guard might use `ExecutionContext` to make decisions based on the specific controller or method being accessed:

+  the `Reflector` is a helper class provided by the `@nestjs/core` package. It is used to retrieve metadata set on class methods or properties. `this.reflector.get()` is called to retrieve the `roles` metadata from the current route handler.

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

```

In this example, `RolesGuard` uses `ExecutionContext` to access custom metadata (e.g., roles) attached to the handler (route) being executed and determines whether the current user has the required roles to access the route.





# Life Cycle Events

https://docs.nestjs.com/fundamentals/lifecycle-events

learn if needed 







# Testing 

https://docs.nestjs.com/fundamentals/testing

 tests often span a variety of types, including unit tests, end-to-end (e2e) tests, integration tests, and so on. While the benefits are unquestionable, it can be tedious to set them up. Nest strives to promote development best practices:

- automatically scaffolds default unit tests for components and e2e tests for applications
- provides default tooling (such as a test runner that builds an isolated module/application loader)
- provides integration with [Jest](https://github.com/facebook/jest) and [Supertest](https://github.com/visionmedia/supertest) out-of-the-box, while remaining agnostic to (保持中立) testing tools
- makes the Nest dependency injection system available in the testing environment for easily mocking components

As mentioned, you can use any **testing framework** that you like, as Nest doesn't force any specific tooling. Simply replace the elements needed (such as the test runner), and you will still enjoy the benefits of Nest's ready-made testing facilities.





