



# Key Takeaways

AOP-based Nest components

---

the sequences of execution: 

```ts
// if no execption is thrown
Request --> Middleware --> Guards --> Interceptors (before) --> Pipes --> Route Handler --> Interceptors (after) --> Exception Filters --> Response

```

```ts
// if an exception is thrown half way: Exception Filters are the next step in the execution sequence after the point of failure.
Middleware --> Exception thrown --> Exception Filters --> Response

Middleware --> Guards --> Exception thrown --> Exception Filters --> Response

Middleware --> Guards --> Interceptors (before) --> Exception thrown --> Exception Filters --> Response

Middleware --> Guards --> Interceptors (before) --> Pipes --> Exception thrown --> Exception Filters --> Response

```



+ `Middlewares`
  + middleware in NestJS is aware of the broader context of an HTTP request (such as headers, body, query parameters, etc.) because it interacts directly with the `Request` and `Response` objects, similar to middleware in Express. But when it comes to the richer, more detailed execution context that includes controller and method-specific information, that level of detail is reserved for the components that operate at a higher level in the request lifecycle, like Guards and Interceptors.
+ `Exception Filters`
  + throw standard HTTP exception
    + Exception Filters are the next step in the execution sequence after the point of failure.
    + If there are global, controller, or handler-specific exception filters, they will handle the exception based on the context in which they were applied. If no custom exception filters are provided or if they don't catch the specific type of exception thrown, NestJS falls back to its default exception filter, which handles the exception and sends an appropriate response to the client.
+ `Guards`
+ `Interceptors`
  + more general-purpose for intercepting and <span style="color:yellow">modifying incoming request & outgoing response</span>, but note exception filter, guards, pipes are not based on interceptor
  + :bangbang: ​possible to inject dependendency (e.g. service) via contructor in an interceptor.  
  + many use cases: logging & monitoring, response transformation, caching, authentication & authorisation ...
+ `Pipes`
  + used for data transformation & data validation




`Param decorator` & `custom decorator`

---

+ <span style="color: yellow">used to extract information from request object</span>
  + able to extract specific field of an attached object to request object
  + able to work with pipe to validate custom attached object to request object
  + able to composite decorator 
+ in conjunction with interceptor, we could use custom decorator to extract additional information attached on request object (e.g. given token, attach Current login user to request object using interceptor, then extract current login user using custom decorator)







# 0.:bangbang: ​AOP components 



AOP intro

https://www.bilibili.com/video/BV1w3411s7ur?p=6&vd_source=c6866d088ad067762877e4b6b23ab9df

+ but in Spring

https://medium.com/@maciejsikorski/aspect-oriented-programming-with-nestjs-a2e420d9980e

https://flowframework.readthedocs.io/en/7.3/TheDefinitiveGuide/PartIII/AspectOrientedProgramming.html





## Overview

In Nest.js, there are several components that can be added before a request reaches the route handler. These components are executed in a specific order and serve different purposes. Here are the main components that can be added before a request reaches the route handler, along with their differences:

1. Middleware:
   - Middleware functions are executed before the route handler and after the request is received by the application.
   - They have access to the `request` and `response` objects and can modify them or perform additional processing.
   - Middleware functions can be used for tasks such as logging, authentication, error handling, or request transformation.
   - Middleware can be applied globally, to specific routes, or to a group of routes.
   - Middleware functions are executed in the order they are defined and can call the `next()` function to pass control to the next middleware or route handler.

2. Guards:
   - Guards are used to determine whether a request should be allowed to proceed to the route handler based on certain conditions.
   - They are executed after middleware and before interceptors, pipes, and the route handler.
   - Guards can be used for authentication, authorization, or any other validation checks.
   - They have access to the `ExecutionContext`, which provides information about the current request and the route handler.
   - Guards can return a boolean value or throw an exception to allow or deny access to the route handler.

3. Interceptors:
   - Interceptors are used to intercept and modify the request or response before or after the route handler is executed.
   - They are executed after guards and before pipes and the route handler.
   - Interceptors can be used for tasks such as logging, response transformation, caching, or error handling.
   - They have access to the `ExecutionContext` and can modify the request or response objects.
   - Interceptors can also handle exceptions thrown by the route handler or subsequent interceptors.

4. Pipes:
   - Pipes are used to transform, validate, or sanitize the data before it reaches the route handler.
   - They operate on the `arguments` being passed to the route handler.
   - Pipes can be used for tasks such as data validation, data transformation, or any other custom processing logic.
   - They are executed after interceptors and before the route handler.
   - Pipes can throw exceptions if the data does not meet the validation criteria.

The order of execution for these components is as follows:

1. Middleware
2. Guards
3. Interceptors (before the route handler)
4. Pipes
5. Route Handler
6. Interceptors (after the route handler)

Each component serves a specific purpose and can be used to handle different aspects of request processing before the route handler is executed. Middleware is used for general request processing and modification, guards are used for access control and validation, interceptors are used for request/response interception and modification, and pipes are used for data transformation and validation.

By combining these components strategically, you can build a robust and modular application that handles requests efficiently and performs necessary validations, transformations, and processing before the request reaches the route handler.



## AOP-based componnets

the components mentioned earlier (middleware, guards, interceptors, and pipes) in Nest.js are based on the Aspect-Oriented Programming (AOP) paradigm.

AOP is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns. It provides a way to add behavior to existing code without modifying the code itself. In Nest.js, these components are designed to address cross-cutting concerns and add additional behavior to the request processing pipeline.

Here's how each component relates to AOP:

1. Middleware:
   - Middleware functions are a form of AOP, as they allow you to add behavior before or after the route handler execution.
   - They can be used to handle cross-cutting concerns such as logging, authentication, or error handling.
   - Middleware can be applied globally or to specific routes, providing a way to modularize and reuse common functionality.
2. Guards:
   - Guards are also based on AOP principles, as they allow you to add access control or validation logic before the route handler is executed.
   - They can be used to handle cross-cutting concerns related to authorization and validation.
   - Guards can be applied to specific routes or controllers, providing a way to enforce access control policies.
3. Interceptors:
   - Interceptors are a powerful AOP mechanism in Nest.js, as they allow you to intercept and modify the request or response before or after the route handler execution.
   - They can be used to handle cross-cutting concerns such as logging, caching, or response transformation.
   - Interceptors can be applied globally or to specific routes, providing a way to modularize and reuse common functionality.
4. Pipes:
   - Pipes are not strictly related to AOP, as they operate on the arguments being passed to the route handler.
   - However, they can be considered a form of AOP in the sense that they allow you to add data transformation and validation logic before the route handler is executed.
   - Pipes can be used to handle cross-cutting concerns related to data validation and transformation.

By using these components based on AOP principles, Nest.js allows you to modularize and separate cross-cutting concerns from the core business logic of your application. You can add behavior to the request processing pipeline without modifying the route handlers themselves.

AOP provides benefits such as improved modularity, reusability, and maintainability. It allows you to handle cross-cutting concerns in a centralized and declarative way, making your code more organized and easier to understand.

Nest.js leverages the power of AOP through these components to provide a flexible and extensible framework for building scalable and modular applications.





### :bangbang: ​ExecutionContext 

<u>see more detailed notes on ExecutionContext in [3](../1-fundamentals/readme.md)</u>



Aspect-Oriented Programming (AOP) in Nest.js allows for the separation of concerns, particularly for cross-cutting concerns like logging, security, or transaction management. AOP components enhance modularity by allowing the separation of these concerns from the main business logic. In Nest.js, the `ExecutionContext` provides detailed context about the current request, and certain AOP components can interact with it:

1. **Guards**
   - Use Case: Determining whether a specific request should proceed.
   - Access: Guards have access to `ExecutionContext`, enabling them to make decisions based on the current request context, including the incoming request, response, and route handler details.

```javascript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Implement logic based on the request
    return true; // or false
  }
}
```

2. **Interceptors**
   - Use Case: Modifying the request/response or executing additional logic before/after the handler.
   - Access: Interceptors have access to `ExecutionContext` and can manipulate the request or response, add logging, handle caching, etc.

```javascript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Access and modify the request/response here
    return next.handle();
  }
}
```

3. **Pipes**
   - Use Case: Transforming input data or performing validation.
   - Access: Pipes can access `ExecutionContext` when used as method-scoped pipes, allowing them to perform transformations or validations with context awareness.

```javascript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Access ExecutionContext through metadata if available
    return transformedValue;
  }
}
```

4. **Filters**
   - Use Case: Handling exceptions.
   - Access: Exception filters can access `ArgmentsHost` (which is the parent class of `ExecutionContext`), enabling them to tailor error responses based on the context of the error, such as the request URL or HTTP method.

```javascript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Custom error response based on the request and exception
  }
}
```

These AOP components allow for modular and clean code organization, especially for handling cross-cutting concerns across your application, by leveraging the `ExecutionContext` to gain insight into the current request cycle.







## common use cases

In a typical Nest.js application, the most commonly used AOP components are interceptors and guards. These components are frequently utilized to handle cross-cutting concerns and add additional behavior to the request processing pipeline. Let's discuss each of them in more detail:

1. Interceptors:
   - Interceptors are widely used in Nest.js applications to intercept and modify the request or response before or after the route handler execution.
   - Common use cases for interceptors include:
     - Logging: Interceptors can be used to log incoming requests and outgoing responses for debugging or monitoring purposes.
     - Response Transformation: Interceptors can modify the response data before it is sent back to the client. This can include adding additional fields, formatting the data, or applying serialization.
     - Caching: Interceptors can be used to implement caching mechanisms, such as response caching, to improve application performance.
     - Error Handling: Interceptors can catch and handle exceptions thrown by the route handlers or other interceptors, providing a centralized way to handle errors.
   - Interceptors are highly reusable and can be applied globally or to specific routes or controllers.

2. Guards:
   - Guards are commonly used in Nest.js applications to handle authentication and authorization.
   - Common use cases for guards include:
     - Authentication: Guards can be used to verify the identity of the user making the request. This can involve checking the presence and validity of authentication tokens, such as JWT (JSON Web Tokens).
     - Authorization: Guards can be used to enforce access control policies based on user roles or permissions. They can determine whether a user is allowed to access a specific route or perform certain actions.
     - Role-based Access Control (RBAC): Guards can be used to implement RBAC, where different user roles have different levels of access to routes and resources.
     - Custom Validation: Guards can perform custom validation logic based on the request data or the current state of the application.
   - Guards are typically used to protect routes or entire controllers, ensuring that only authorized users can access them.

While interceptors and guards are the most commonly used AOP components in Nest.js applications, middleware and pipes are also used in certain scenarios:

- Middleware:
  - Middleware functions are used for request preprocessing, such as parsing request bodies, handling CORS (Cross-Origin Resource Sharing), or applying rate limiting.
  - Middleware can be used to modify the request or response objects before they reach the route handlers.

- Pipes:
  - Pipes are used for data transformation and validation of the request payload or query parameters.
  - They are commonly used to validate and transform the input data before it reaches the route handlers, ensuring that the data is in the expected format and meets the required constraints.

The choice of which AOP components to use in your Nest.js application depends on the specific requirements and the cross-cutting concerns you need to handle. Interceptors and guards are the most frequently used components due to their versatility and the common scenarios they address, such as logging, response transformation, authentication, and authorization.

By leveraging these AOP components effectively, you can build a modular and maintainable Nest.js application that separates cross-cutting concerns from the core business logic.



## AOP: RESTful or GraphQL ?

The concepts of interceptors, guards, middleware, and pipes in Nest.js are not limited to REST APIs. They can also be applied to GraphQL APIs built with Nest.js.

Nest.js provides a `@nestjs/graphql` module that allows you to create GraphQL APIs seamlessly. When building GraphQL APIs with Nest.js, you can still leverage the power of these AOP components to handle cross-cutting concerns and add additional behavior to the request processing pipeline.

Let's see how each component can be used in the context of GraphQL:

1. Interceptors:
   - Interceptors can be used in GraphQL APIs to intercept and modify the execution context or the response.
   - They can be used for tasks such as logging, performance monitoring, or response caching.
   - Interceptors can be applied to GraphQL resolvers or to the entire GraphQL schema.

2. Guards:
   - Guards can be used in GraphQL APIs to handle authentication and authorization.
   - They can be used to protect specific GraphQL resolvers or fields based on user roles or permissions.
   - Guards can be applied to individual resolvers or to the entire GraphQL schema.

3. Middleware:
   - Middleware functions can be used in GraphQL APIs to preprocess the incoming GraphQL requests.
   - They can be used for tasks such as request validation, request parsing, or applying rate limiting.
   - Middleware can be applied to the GraphQL server as a whole or to specific resolvers.

4. Pipes:
   - Pipes can be used in GraphQL APIs to validate and transform the input arguments of GraphQL resolvers.
   - They can be used to ensure that the input data meets the required constraints and is in the expected format.
   - Pipes can be applied to individual resolver arguments or to the entire GraphQL schema.

When building GraphQL APIs with Nest.js, you can use these AOP components in a similar way as you would with REST APIs. <span style="color:yellow">The main difference is that instead of applying them to routes or controllers, you apply them to GraphQL resolvers or the GraphQL schema.</span>

For example, you can use interceptors to intercept and modify the execution context of GraphQL resolvers, guards to protect specific resolvers based on authentication and authorization, middleware to preprocess incoming GraphQL requests, and pipes to validate and transform the input arguments of resolvers.

Nest.js provides a consistent and unified approach to building both REST APIs and GraphQL APIs, allowing you to leverage the same powerful features and concepts across different API paradigms.

By using these AOP components in your GraphQL APIs, you can handle cross-cutting concerns, add additional behavior, and ensure the security and integrity of your GraphQL operations, just like you would with REST APIs.



### :gem: GraphQL demo

Here's a simple demo that demonstrates the use of interceptors, guards, and pipes in a GraphQL API built with Nest.js:

```typescript
import { Module, UseGuards, UseInterceptors } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServer } from 'apollo-server-express';
import { AuthGuard } from './auth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ValidationPipe } from './validation.pipe';

// GraphQL schema
@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

// GraphQL resolver
@Resolver(User)
export class UserResolver {
  @Query(() => User)
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  async getUser(@Args('id', ValidationPipe) id: string): Promise<User> {
    // Retrieve user from the database based on the provided id
    // ...
  }
}

// Nest.js module
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [UserResolver],
})
export class AppModule {}

// AOP components ---------------------------------------------------------------------
// Authentication guard
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Perform authentication logic
    // ...
  }
}

// Logging interceptor
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

// Validation pipe
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Perform validation logic on the input argument
    // ...
    return value;
  }
}
```

In this demo:

1. We define a GraphQL schema with a `User` type and a corresponding `UserResolver` that provides a `getUser` query.

2. We apply the `AuthGuard` to the `getUser` query using the `@UseGuards` decorator. The `AuthGuard` is responsible for performing authentication logic before allowing access to the resolver.

3. We apply the `LoggingInterceptor` to the `getUser` query using the `@UseInterceptors` decorator. The `LoggingInterceptor` logs a message before and after the resolver execution, along with the execution time.

4. We use the `ValidationPipe` on the `id` argument of the `getUser` query using the `@Args` decorator. The `ValidationPipe` performs validation on the input argument to ensure it meets certain criteria.

5. The `AppModule` is defined to set up the GraphQL module and register the `UserResolver`.

When a client makes a GraphQL query to retrieve a user, the following steps occur:

1. The `AuthGuard` is executed to perform authentication. If authentication fails, an error is thrown.
2. If authentication succeeds, the `LoggingInterceptor` logs a message before the resolver execution.
3. The `ValidationPipe` validates the `id` argument passed to the `getUser` query.
4. If validation passes, the `getUser` resolver is executed, retrieving the user from the database based on the provided `id`.
5. After the resolver execution, the `LoggingInterceptor` logs another message along with the execution time.
6. The response is sent back to the client.

This demo showcases how interceptors, guards, and pipes can be used in a GraphQL API built with Nest.js to handle cross-cutting concerns such as authentication, logging, and input validation.



### :gem: REST demo​

Certainly! Here's an equivalent version of the demo using interceptors, guards, and pipes in a REST API built with Nest.js:

```typescript
import { Module, Controller, Get, Param, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ValidationPipe } from './validation.pipe';

// User entity
export class User {
  id: string;
  name: string;
  email: string;
}

// User controller
@Controller('users')
export class UserController {
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  @UsePipes(ValidationPipe)
  async getUser(@Param('id') id: string): Promise<User> {
    // Retrieve user from the database based on the provided id
    // ...
  }
}

// Nest.js module
@Module({
  controllers: [UserController],
})
export class AppModule {}


// AOP components ---------------------------------------------------------------------
// Authentication guard
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Perform authentication logic
    // ...
  }
}

// Logging interceptor
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

// Validation pipe
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Perform validation logic on the input parameter
    // ...
    return value;
  }
}
```

In this REST API version:

1. We define a `User` entity that represents the structure of a user object.

2. We create a `UserController` with a `getUser` endpoint that accepts an `id` parameter.

3. We apply the `AuthGuard` to the `getUser` endpoint using the `@UseGuards` decorator. The `AuthGuard` performs authentication before allowing access to the endpoint.

4. We apply the `LoggingInterceptor` to the `getUser` endpoint using the `@UseInterceptors` decorator. The `LoggingInterceptor` logs a message before and after the endpoint execution, along with the execution time.

5. We use the `ValidationPipe` on the `id` parameter of the `getUser` endpoint using the `@UsePipes` decorator. The `ValidationPipe` validates the input parameter to ensure it meets certain criteria.

6. The `AppModule` is defined to register the `UserController`.

When a client makes an HTTP GET request to the `/users/:id` endpoint, the following steps occur:

1. The `AuthGuard` is executed to perform authentication. If authentication fails, an error is thrown.
2. If authentication succeeds, the `LoggingInterceptor` logs a message before the endpoint execution.
3. The `ValidationPipe` validates the `id` parameter passed to the `getUser` endpoint.
4. If validation passes, the `getUser` endpoint is executed, retrieving the user from the database based on the provided `id`.
5. After the endpoint execution, the `LoggingInterceptor` logs another message along with the execution time.
6. The response is sent back to the client.

This REST API version demonstrates how interceptors, guards, and pipes can be used in a similar way as the GraphQL version to handle cross-cutting concerns such as authentication, logging, and input validation.

The main difference is that instead of applying the decorators to GraphQL resolvers, they are applied to the controller methods in the REST API.



### Analogue: REST vs. GraphQL

Certainly! Let's draw an analogy between the classes and concepts used in the GraphQL and REST examples in Nest.js:

GraphQL:
1. `@ObjectType()` and `@Field()` decorators:
   - These decorators are used to define the structure of a GraphQL object type.
   - They are used to create a schema that describes the shape of the data that can be queried.
   - Analogous to defining a DTO (Data Transfer Object) or an entity class in a REST API.

2. `@Resolver()` decorator:
   - Used to define a GraphQL resolver class that contains methods to resolve GraphQL queries and mutations.
   - Analogous to a controller class in a REST API, which handles incoming HTTP requests.

3. `@Query()` and `@Mutation()` decorators:
   - Used to define GraphQL query and mutation methods within a resolver class.
   - Analogous to defining HTTP endpoint methods (e.g., `@Get()`, `@Post()`) in a controller class of a REST API.

4. `@Args()` decorator:
   - Used to define arguments for a GraphQL query or mutation method.
   - Analogous to using `@Param()`, `@Query()`, or `@Body()` decorators in a REST API to extract data from the request.

REST:
1. Entity classes:
   - Used to define the structure and properties of a resource in a REST API.
   - Analogous to defining an `@ObjectType()` in GraphQL to represent the shape of the data.

2. Controller classes:
   - Used to define a group of related HTTP endpoints in a REST API.
   - Analogous to a resolver class in GraphQL, which groups related query and mutation methods.

3. HTTP endpoint decorators (`@Get()`, `@Post()`, etc.):
   - Used to define HTTP endpoints within a controller class.
   - Analogous to defining query and mutation methods using `@Query()` and `@Mutation()` decorators in a GraphQL resolver.

4. Parameter decorators (`@Param()`, `@Query()`, `@Body()`, etc.):
   - Used to extract data from the HTTP request in a REST API endpoint method.
   - Analogous to using the `@Args()` decorator in a GraphQL query or mutation method to accept arguments.



Both GraphQL and REST APIs in Nest.js use similar decorators and concepts for handling cross-cutting concerns:

- `@UseGuards()`: Used to apply guard classes for authentication and authorization.
- `@UseInterceptors()`: Used to apply interceptor classes for request/response interception and modification.
- `@UsePipes()`: Used to apply pipe classes for input validation and transformation.

The main difference lies in how the data is structured and accessed:
- In GraphQL, the schema defines the structure of the data, and clients can query specific fields they need.
- In REST, the endpoints define the structure of the data, and clients typically retrieve the entire resource.

Despite these differences, the underlying concepts of controllers (resolvers), guards, interceptors, and pipes remain similar in both GraphQL and REST APIs built with Nest.js.

The analogy helps to understand how the classes and decorators in GraphQL and REST APIs serve similar purposes and how they can be used to build structured and reusable code in Nest.js.





# 1. :moon: ​Middleware

<span style="color:yellow">Middleware is a function which is called **before** the `route handler`.</span>  -> <span style="color:red">middleware is applied to route handler</span>.  Middleware functions have access to the [request](https://expressjs.com/en/4x/api.html#req) and [response](https://expressjs.com/en/4x/api.html#res) objects, and the `next()` middleware function in the application’s request-response cycle.

Nest middleware are, by default, equivalent to [express](https://expressjs.com/en/guide/using-middleware.html) middleware. The following description from the official express documentation describes the capabilities of middleware:

> Middleware functions can perform the following tasks: 
>
> - execute any code.
> - make changes to the request and the response objects.
> - end the request-response cycle.
> - call the next middleware function in the stack.
> - if the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.
>
> :bangbang: ​`Express` and `fastify` handle middleware differently and provide different method signatures, read more [here](https://docs.nestjs.com/techniques/performance#middleware).



## Creating Middleware 

```ts
// logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

```





## Applying the Middleware

There is no place for middleware in the `@Module()` decorator. Instead, we set them up using the `configure()` method of the module class. Modules that include middleware have to implement the `NestModule` interface. Let's set up the `LoggerMiddleware` at the `AppModule` level.

```ts
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

In the above example we have set up the `LoggerMiddleware` for the `/cats` route handlers that were previously defined inside the `CatsController`.

We may also further restrict a middleware to a particular request method by passing an object containing the route `path` and request `method` to the `forRoutes()` method when configuring the middleware. In the example below, notice that we import the `RequestMethod` enum to reference the desired request method type.

```ts
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', 
                  method: RequestMethod.GET });
  }
}
```



## Middleware Consumer

The `MiddlewareConsumer` is a helper class. It provides several built-in methods to manage middleware. All of them can be simply **chained** in the [fluent style](https://en.wikipedia.org/wiki/Fluent_interface). 





```ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { AuthMiddleware } from './auth.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats')
      .apply(AuthMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.GET })
      .forRoutes(CatsController);
  }
}
```

In this example, the `LoggerMiddleware` will be applied to all requests to the `/cats` route, while the `AuthMiddleware` will be applied to all routes defined in the `CatsController`, except for the GET request to the `/cats` route.



## Special Middlewares



Functional Middleware vs. Class Middleware

---

The `LoggerMiddleware` class we've been using is quite simple. It has no members, no additional methods, and no dependencies. Why can't we just define it in a simple function instead of a class? In fact, we can. This type of middleware is called **functional middleware**. Let's transform the logger middleware from class-based into functional middleware to illustrate the difference:

```ts
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};
```

apply it  within AppModule:

```ts
// app.module.ts
consumer
  .apply(logger)
  .forRoutes(CatsController);
```

> :bangbang: Consider using the simpler **functional middleware** alternative any time your middleware doesn't need any dependencies.





Multiple Middleware

---

As mentioned above, in order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the `apply()` method:

:gem: e.g.1​

```ts
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```



:gem: e.g.2​

```ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { AuthMiddleware } from './auth.middleware';
import { CacheMiddleware } from './cache.middleware';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthMiddleware, CacheMiddleware)
      .forRoutes(CatsController);
  }
}
```

With this configuration, whenever a request matches a route in the `CatsController`, the following middleware will be executed in sequence:

1. `LoggerMiddleware`: This middleware will log the request details.
2. `AuthMiddleware`: This middleware will perform authentication and authorization checks.
3. `CacheMiddleware`: This middleware will handle caching of responses.

Each middleware will be executed in the specified order, and the request will pass through each middleware before reaching the route handler in the `CatsController`.



Gloabal Middleware

---

If we want to bind middleware to every registered route at once, we can use the `use()` method that is supplied by the `INestApplication` instance:

```ts
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```







# 2. Exception Filters

Nest comes with a built-in **exceptions layer** which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

Out of the box, this action is performed by a built-in **global exception filter**, which handles exceptions of type `HttpException` (and subclasses of it). When an exception is **unrecognized** (is neither `HttpException` nor a class that inherits from `HttpException`), the built-in exception filter generates the following default JSON response:

```ts
{
  "statusCode": 500,
  "message": "Internal server error"
}
```





## Throwing standard exception

Nest provides a built-in `HttpException` class, exposed from the `@nestjs/common` package. For typical HTTP REST/GraphQL API based applications, it's best practice to send standard HTTP response objects when certain error conditions occur.

```ts
// cats.controller.ts
@Get()
async findAll() {
  throw new HttpException('Forbidden', 
                          HttpStatus.FORBIDDEN);
}
```

The `HttpException` constructor takes two required arguments which determine the response:

- The `response` argument defines the JSON response body. It can be a `string` or an `object` as described below.
- The `status` argument defines the [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).



## Built-in HTTP Exceptions

Nest provides a set of standard exceptions that inherit from the base `HttpException`. These are exposed from the `@nestjs/common` package, and represent many of the most common HTTP exceptions:

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `HttpVersionNotSupportedException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableEntityException`
- `InternalServerErrorException`
- `NotImplementedException`
- `ImATeapotException`
- `MethodNotAllowedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`
- `PreconditionFailedException`

All the built-in exceptions can also provide both an error `cause` and an error description using the `options` parameter:

```ts
throw new BadRequestException('Something bad happened', 
                              { cause: new Error(), description: 'Some error description' })
```

Using the above, this is how the response would look:

```ts
{
  "message": "Something bad happened",
  "error": "Some error description",
  "statusCode": 400,
}

```





Custom exceptions

---

In many cases, you will not need to write custom exceptions, and can use the built-in Nest HTTP exception.   

If you do need to create customized exceptions, it's good practice to create your own **exceptions hierarchy**, where your custom exceptions inherit from the base `HttpException` class. 





## :moon: Exception Filter



While the base (built-in) exception filter can automatically handle many cases for you, you may want **full control** over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. **`Exception filters`** are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.

> In Nest.js, Exception Filters are implemented as a form of AOP. They allow you to intercept and handle exceptions that occur within your application in a centralized and declarative manner, without modifying the core business logic of your controllers or services.



It's important to note that <span style="color:red">if an exception is thrown within an Interceptor, Guard, or Pipe before reaching the Controller method, the Exception Filter will still be executed first, followed by any remaining Interceptors.</span>

To summarize:

- In a normal request-response cycle without exceptions, Interceptors are executed before and after the Controller method.
- When an exception is thrown, the Exception Filter is executed first, followed by any remaining Interceptors.





step1: define Exception Filter

+ The `@Catch(HttpException)` decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type `HttpException` and nothing else. The `@Catch()` decorator may take a single parameter, or a comma-separated list. This lets you set up the filter for several types of exceptions at once.

```ts
// http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

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

Step2: apply the exception filter to a route handler

+ Exception Filter can also be binded to controller or on a gloabal scope, but essentinally it applies to route handler

```ts
// inside controller
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

看完了



# 3.​ :moon: ​Pipe

https://docs.nestjs.com/pipes

A pipe is a class annotated with the `@Injectable()` decorator, which implements the `PipeTransform` interface.

Pipes have two typical use cases:

- **Data Transformation**: transform input data to the desired form (e.g., from string to integer)
- **Validation**: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception



>  Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer (global exceptions filter and any [exceptions filters](https://docs.nestjs.com/exception-filters) that are applied to the current context). Given the above, <span style="color:red">it should be clear that when an exception is thrown in a Pipe, no controller method is subsequently executed.</span> 



## 3.1 Pipe basics

### Built-in pipes

Nest comes with nine pipes available out-of-the-box (You can find full details, along with lots of examples [here](https://docs.nestjs.com/techniques/validation)): 

validation pipe:

- `ValidationPipe`

data transformation pipe:

- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePipe`

They're exported from the `@nestjs/common` package.

> Apart from these built-in pipes, we can also customise a pipe (But under most  circumstances, it is unnecessary)





### Binding pipes

To use a pipe, we need to bind an instance of the pipe class to the appropriate context. In our `ParseIntPipe` example, we want to associate the pipe with a particular route handler method, and make sure it runs before the method is called. 

```ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

This ensures that one of the following two conditions is true: either the parameter we receive in the `findOne()` method is a number (as expected in our call to `this.catsService.findOne()`), or an exception is thrown before the route handler is called. For example, assume the route is called like:

```ts
GET localhost:3000/abc
```

Nest will throw an exception like this:

```ts
{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
```



Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options:

```ts
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```





### custom pipes

https://docs.nestjs.com/pipes#custom-pipes



usually built-in pipes are enough, check out custom pipes when needed 



### Option1: Schema-based validation

we probably would like to ensure that the post body object is valid before attempting to run our service method.

```ts
// controller
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}

// dto
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```





#### Object-schema validation

There are several approaches available for doing object validation in a clean, [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) way. One common approach is to use **schema-based** validation. 

The [Zod](https://zod.dev/) library allows you to create schemas in a straightforward way, with a readable API. Let's build a validation pipe that makes use of Zod-based schemas.

Start by installing the required package:

```ts
$ npm install --save zod
```



In the code sample below, we create a simple class that takes a schema as a `constructor` argument. We then apply the `schema.parse()` method, which validates our incoming argument against the provided schema.

As noted earlier, a **validation pipe** either returns the value unchanged or throws an exception.

```ts
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema  } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}

```



schema 

```ts
import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
```

apply validation pipe & schema to the route handler

```ts
// cats.controller.ts
@Post()
@UsePipes(new ZodValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```



### :bangbang: ​Option2: Decorator-based validation

Alternative way of doing validation to shema-based validation (I like this one)



Nest works well with the [class-validator](https://github.com/typestack/class-validator) library. This powerful library allows you to use `decorator-based validation`. Decorator-based validation is extremely powerful, especially when combined with Nest's **Pipe** capabilities since we have access to the `metatype` of the processed property. Before we start, we need to install the required packages:

```shell
$ npm i --save class-validator class-transformer
```

Once these are installed, we can add a few decorators to the `CreateCatDto` class. Here we see a significant advantage of this technique: the `CreateCatDto` class remains the single source of truth for our Post body object (rather than having to create a separate validation class).

```ts
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```



Now we can create a `ValidationPipe` class that uses these annotations.

+ `plainToInstance()`: plain vanilla object -> decorated object
  + The reason we must do this is that the incoming post body object, when deserialized from the network request, does **not have any type information** (this is the way the underlying platform, such as Express, works). Class-validator needs to use the validation decorators we defined for our DTO earlier, so we need to perform this transformation to treat the incoming body as an appropriately decorated object, not just a plain vanilla object.
+ since this is a **validation pipe** it either returns the value unchanged, or throws an exception.

```ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    
    const object = plainToInstance(metatype, value); //  transform our plain JavaScript argument object into a typed object so that we can apply validation
    
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```



finally, we use the validation pipe to a route handler

+ Pipes can be parameter-scoped, method-scoped, controller-scoped, or global-scoped. 

```ts
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}
```





## 3.2 :gem: common use cases​

Pipes in Nest.js are essential for handling data validation and transformation, enhancing the robustness and reliability of your application. Let's delve into each use case with examples:

1. :bangbang: ​**Validation with Class Validator**
   - Use Case: Ensuring incoming request data meets your application's criteria before processing.
   - Example: Using `ValidationPipe` to automatically validate DTOs (Data Transfer Objects).

```javascript
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    // createUserDto is validated by the ValidationPipe
    return 'User created';
  }
}
```

2. :bangbang: ​**Transformation**
   - Use Case: Converting request data to a specific type or format.
   - Example: Transforming query parameters from strings to integers.

```javascript
import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';

@Controller('events')
export class EventsController {
  @Get()
  getEvents(@Query('page', ParseIntPipe) page: number) {
    // 'page' query parameter is parsed to a number
    return `Events page: ${page}`;
  }
}
```

3. **Default Values**
   - Use Case: Providing default values for missing data in requests.
   - Example: Custom pipe that assigns a default page number if not provided in the query.

```javascript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DefaultPagePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value || 1; // Default to page 1 if undefined
  }
}
```

4. **Parameter Parsing**
   - Use Case: Ensuring URL parameters are of the correct type.
   - Example: Parsing an ID from a route parameter to a number.

```javascript
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    // 'id' parameter is guaranteed to be a number
    return `User ID: ${id}`;
  }
}
```

5. **Complex Object Construction**
   - Use Case: Constructing complex types from incoming data.
   - Example: Using pipes to transform plain objects into class instances.

```javascript
import { Body, Controller, Post } from '@nestjs/common';
import { TransformPipe } from './transform.pipe';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Body(TransformPipe) user: User) {
    // 'user' is an instance of User class, transformed by TransformPipe
    return user;
  }
}
```











# 4. :full_moon: Guards

A guard is a class annotated with the `@Injectable()` decorator, which implements the `CanActivate` interface.

Guards have a **single responsibility**. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as **authorization**.



> why guards over middleware ?  
>
> Authorization (and its cousin, **authentication**, with which it usually collaborates) has typically been handled by [middleware](https://docs.nestjs.com/middleware) in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the `request` object are not strongly connected with a particular route context (and its metadata).
>
> But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the `next()` function. On the other hand, **Guards** have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.



## 4.1 Guard basics

### Authorisation guard

---

As mentioned, **authorization** is a great use case for Guards because specific routes should be available only when the caller (usually a specific authenticated user) has sufficient permissions. 

The `AuthGuard` that we'll build now assumes an authenticated user (and that, therefore, a token is attached to the request headers). It will extract and validate the token, and use the extracted information to determine whether the request can proceed or not:

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

Every guard must implement a `canActivate()` function. This function should return a boolean, indicating whether the current request is allowed or not. It can return the response either synchronously or asynchronously (via a `Promise` or `Observable`). Nest uses the return value to control the next action:

- if it returns `true`, the request will be processed.
- if it returns `false`, Nest will deny the request.



Note that behind the scenes, when a guard returns `false`, the framework throws a `ForbiddenException`. If you want to return a different error response, you should throw your own specific exception. For example:

```typescript
throw new UnauthorizedException();
```

Any exception thrown by a guard will be handled by the [exceptions layer](https://docs.nestjs.com/exception-filters) (global exceptions filter and any exceptions filters that are applied to the current context).





### Execution Context

---

The `canActivate()` function takes a single argument, the `ExecutionContext` instance. The `ExecutionContext` inherits from `ArgumentsHost`. We saw `ArgumentsHost` previously in the exception filters chapter. In the sample above, we are just using the same helper methods defined on `ArgumentsHost` that we used earlier, to get a reference to the `Request` object. You can refer back to the **Arguments host** section of the [exception filters](https://docs.nestjs.com/exception-filters#arguments-host) chapter for more on this topic.

By extending `ArgumentsHost`, `ExecutionContext` also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic guards that can work across a broad set of controllers, methods, and execution contexts. Learn more about `ExecutionContext`[here](https://docs.nestjs.com/fundamentals/execution-context).



### Bind guard

---

Like pipes and exception filters, guards can be **controller-scoped**, method-scoped, or global-scoped. Below, we set up a controller-scoped guard using the `@UseGuards()` decorator.

```ts
@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {}
```



## 4.​2 :gem: use cases​

Let's create a simple authorization guard that checks if a user has the required role to access a route. This example will demonstrate how to restrict access to certain parts of your application based on user roles.

+ in this demo, role is attached to a certain route handler



1. **Define User Roles**: Assume we have defined user roles as an enumeration for clarity and reuse throughout the application.

```javascript
// roles.enum.ts
export enum Role {
  Admin = 'admin',
  Editor = 'editor',
  User = 'user',
}
```

2. **Create the Roles Decorator**: We'll use a custom decorator to annotate our route handlers with the required roles.

```javascript
// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

3. **Implement the Authorization Guard**: The guard will extract roles from the route's custom metadata and verify if the user's role matches any of the required roles.

```javascript
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are required, allow access.
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming the user object is attached to the request (e.g., by a previous authentication middleware).

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

4. **Apply the Guard to Your Application**: Use the guard at the controller or route handler level, and annotate the handlers with the required roles.
   + role is given per route handler 

```javascript
// app.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('dashboard')
@UseGuards(RolesGuard) // Applying the guard at the controller level
export class DashboardController {

  @Get()
  @Roles(Role.Admin) // Only users with the 'admin' role can access this route
  findAll() {
    return 'This route is restricted to administrators.';
  }

  @Get('editor-section')
  @Roles(Role.Editor, Role.Admin) // Both 'editor' and 'admin' roles can access this route
  findEditorSection() {
    return 'This route is accessible to editors and administrators.';
  }
}
```

5. **Ensure the User Object is Available**: This example assumes that a user object, including roles, is attached to the request object, typically by an authentication strategy earlier in the request processing pipeline.

By following these steps, you implement an authorization mechanism in Nest.js using guards, custom decorators, and role checking to protect routes based on user roles.





# 5. :full_moon: Interceptor

https://docs.nestjs.com/interceptors

最直接用AOP的nest component



An interceptor is a class annotated with the `@Injectable()` decorator and implements the `NestInterceptor` interface.

Interceptors have a set of useful capabilities which are inspired by the [Aspect Oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming) (AOP) technique. They make it possible to:

- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)



## 5.1 :bangbang: ​Basics

Each interceptor implements the `intercept()` method, which takes two arguments: Execution Context & Call Handler

> Interceptors, like controllers, providers, guards, and so on, can **inject dependencies** through their `constructor`.



### Execution Context

---

The first one is the `ExecutionContext` instance (exactly the same object as for [guards](https://docs.nestjs.com/guards)). The `ExecutionContext` inherits from `ArgumentsHost`. We saw `ArgumentsHost` before in the exception filters chapter. There, we saw that it's a wrapper around arguments that have been passed to the original handler, and contains different arguments arrays based on the type of the application. You can refer back to the [exception filters](https://docs.nestjs.com/exception-filters#arguments-host) for more on this topic.

By extending `ArgumentsHost`, `ExecutionContext` also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic interceptors that can work across a broad set of controllers, methods, and execution contexts. Learn more about `ExecutionContext`[here](https://docs.nestjs.com/fundamentals/execution-context).



### Call Handler 

---

The second argument is a `CallHandler`. The `CallHandler` interface implements the `handle()` method, which you can use to invoke the route handler method at some point in your interceptor. If you don't call the `handle()` method in your implementation of the `intercept()` method, the route handler method won't be executed at all. <span style="color:yellow">This approach means that the `intercept()` method effectively **wraps** the request/response stream. As a result, you may implement custom logic **both before and after** the execution of the final route handler.</span> 

+ It's clear that you can write code in your `intercept()` method that executes **before** calling `handle()`, 
+ but how do you affect what happens afterward? Because the `handle()` method returns an `Observable`, we can use powerful [RxJS](https://github.com/ReactiveX/rxjs) operators to further manipulate the response. 

Using Aspect Oriented Programming terminology, the invocation of the route handler (i.e., calling `handle()`) is called a [Pointcut](https://en.wikipedia.org/wiki/Pointcut), indicating that it's the point at which our additional logic is inserted.



Consider, for example, an incoming `POST /cats` request. This request is destined for the `create()` handler defined inside the `CatsController`. If an interceptor which does not call the `handle()` method is called anywhere along the way, the `create()` method won't be executed. Once `handle()` is called (and its `Observable` has been returned), the `create()` handler will be triggered. And once the response stream is received via the `Observable`, additional operations can be performed on the stream, and a final result returned to the caller.



## 5.2 :gem: ​Common Use Cases

these use cases are independent to the business logic



:bangbang: most of the examples provided here are in REST api​

Interceptors, on the other hand, provide a more general-purpose mechanism for intercepting and modifying incoming requests and outgoing responses. They can be used for cross-cutting concerns like logging, monitoring, response transformation, and more.

It's important to note that while interceptors can be used to handle exceptions, transform responses, or perform authentication and authorization, it's generally recommended to use the dedicated concepts (exception filters, pipes, and guards) for those specific purposes to maintain a clear separation of concerns and promote code modularity and reusability.



### Logging & monitoring

:gem: e.g.1​

```ts
// logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

Since `handle()` returns an RxJS `Observable`, we have a wide choice of operators we can use to manipulate the stream. In the example above, we used the `tap()` operator, which invokes our anonymous logging function upon graceful or exceptional termination of the observable stream, but doesn't otherwise interfere with the response cycle.



bind interceptor

---

In order to set up the interceptor, we use the `@UseInterceptors()` decorator imported from the `@nestjs/common`package. Like [pipes](https://docs.nestjs.com/pipes) and [guards](https://docs.nestjs.com/guards), interceptors can be controller-scoped, method-scoped, or global-scoped.

```ts
// cats.controller.ts: bind interceptor to controller-level
@UseInterceptors(new LoggingInterceptor())
export class CatsController {}
```



:gem: e.g.2

```ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const responseTime = Date.now() - now;
        console.log(`[${method}] ${url} ${statusCode} - ${responseTime}ms`);
      }),
    );
  }
}
```





### Modify incoming request

---

:gem: e.g.1

get current user of the incoming request (udemy nest.js course C11)

+ firstly inject a UserService to the interceptor
+ then look up the user by userId, attach the user entity to the request object
+ then use param decorator to extract the currentUser field in the request object







### Response Transformation

---

We already know that `handle()` returns an `Observable`. The stream contains the value **returned** from the route handler, and thus we can easily mutate it using RxJS's `map()` operator.



:gem: e..g.1​

Let's create the `TransformInterceptor`, which will modify each response in a trivial way to demonstrate the process. It will use RxJS's `map()` operator to assign the response object to the `data` property of a newly created object, returning the new object to the client.

```ts
// transform.itertceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
```

With the above construction, when someone calls the `GET /cats` endpoint, the response would look like the following (assuming that route handler returns an empty array `[]`):

```ts
{
  "data": []
}
```



:gem: e.g.2​

````ts
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
````







### Exception Mapping

---

Another interesting use-case is to take advantage of RxJS's `catchError()` operator to override thrown exceptions:

:bangbang: it is recommended to use Exception FIlter to hanlde exceptions​

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(() => new BadGatewayException())),
      );
  }
}
```





### Cache 

---

There are several reasons why we may sometimes want to completely prevent calling the handler and return a different value instead. An obvious example is to implement a cache to improve response time. Let's take a look at a simple **cache interceptor** that returns its response from a cache. In a realistic example, we'd want to consider other factors like TTL, cache invalidation, cache size, etc., but that's beyond the scope of this discussion. Here we'll provide a basic example that demonstrates the main concept.

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
```

Our `CacheInterceptor` has a hardcoded `isCached` variable and a hardcoded response `[]` as well. The key point to note is that we return a new stream here, created by the RxJS `of()` operator, therefore the route handler **won't be called** at all. When someone calls an endpoint that makes use of `CacheInterceptor`, the response (a hardcoded, empty array) will be returned immediately. 

In order to create a generic solution, you can take advantage of `Reflector` and create a custom decorator. The `Reflector` is well described in the [guards](https://docs.nestjs.com/guards) chapter.



### Handle Timeout 

---

The possibility of manipulating the stream using RxJS operators gives us many capabilities. Let's consider another common use case. Imagine you would like to handle **timeouts** on route requests. When your endpoint doesn't return anything after a period of time, you want to terminate with an error response. The following construction enables this:

```ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  };
};
```

After 5 seconds, request processing will be canceled. You can also add custom logic before throwing `RequestTimeoutException` (e.g. release resources).





### Authentication & Authorisation

Interceptors can be used to perform authentication and authorization checks before allowing the request to proceed to the route handler.

:bangbang: it is recommended to use guards to do authentication & authorisation​

```ts
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    
    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }
    
    try {
      const user = this.authService.validateToken(token);
      request.user = user;
      return next.handle();		// proceed to route handler
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
```







# 6. Custom Decorator



[reading: decorator in ES2016](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)



> An ES2016 decorator is an expression which returns a function and can take a target, name and property descriptor as arguments. You apply it by prefixing the decorator with an `@` character and placing this at the very top of what you are trying to decorate. Decorators can be defined for either a class, a method or a property.





## param decorators

Nest provides a set of useful **param decorators** that you can use together with the HTTP route handlers. Below is a list of the provided decorators and the plain Express (or Fastify) objects they represent

+ these param decorator is used to extract info from request object, you would ususally use them in the argument of a route handle - i.e. the extraction logic run inside a route handeler  

| `@Request(), @Req()`       | `req`                                |
| -------------------------- | ------------------------------------ |
| `@Response(), @Res()`      | `res`                                |
| `@Next()`                  | `next`                               |
| `@Session()`               | `req.session`                        |
| `@Param(param?: string)`   | `req.params` / `req.params[param]`   |
| `@Body(param?: string)`    | `req.body` / `req.body[param]`       |
| `@Query(param?: string)`   | `req.query` / `req.query[param]`     |
| `@Headers(param?: string)` | `req.headers` / `req.headers[param]` |
| `@Ip()`                    | `req.ip`                             |
| `@HostParam()`             | `req.hosts`                          |





## custom decorator



e.g. use interceptor to attach User entity to an incoming request object, then use a custom decorator to extract the User entity from request object in a route handler 





### passing data

if we attach a complex data structure to a request object in our authentication layer,

```ts
{
  "id": 101,
  "firstName": "Alan",
  "lastName": "Turing",
  "email": "alan@email.com",
  "roles": ["admin"]
}
```

we could define a custom decorator that extract only a fraction of the data structure

```ts
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;		// get the user obj from request obj

    return data ? user?.[data] : user;
  },
);
```

we just extract firstName from the data structure. We can use this same decorator with different keys to access different properties. If the `user` object is deep or complex, this can make for easier and more readable request handler implementations.

```ts
// user.controller.ts
@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}
```





### working with pipes

as suggested in pipe section, pipe can be used for data validation, of course we can use it along with a custom decorator



Nest treats custom param decorators in the same fashion as the built-in ones (`@Body()`, `@Param()` and `@Query()`). This means that pipes are executed for the custom annotated parameters as well (in our examples, the `user` argument). Moreover, you can apply the pipe directly to the custom decorator:

```typescript
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}
```

> Note that `validateCustomDecorators` option must be set to true. `ValidationPipe` does not validate arguments annotated with the custom decorators by default.





### decorator composition

for the sake of simplicity, you may want to build a decorator that contains a pack of other decorators. For example, suppose you want to combine all decorators related to authentication into a single decorator. This could be done with the following construction:

```ts
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
```

```ts
@Get('users')
@Auth('admin')
findAllUsers() {}
```

This has the effect of applying all four decorators with a single declaration.
