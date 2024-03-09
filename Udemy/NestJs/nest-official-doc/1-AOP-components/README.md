

# Key Takeaways

AOP-based Nest components: 

+ Middleware
+ Exception Filters
  + throw standard HTTP exception
+ Guard
+ Interceptor
+ Pipe





# :bangbang: ​AOP components 



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





# 3.​ :moon: ​Pipe

A pipe is a class annotated with the `@Injectable()` decorator, which implements the `PipeTransform` interface.

Pipes have two typical use cases:

- **Data Transformation**: transform input data to the desired form (e.g., from string to integer)
- **Validation**: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception



>  Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer (global exceptions filter and any [exceptions filters](https://docs.nestjs.com/exception-filters) that are applied to the current context). Given the above, it should be clear that when an exception is thrown in a Pipe, no controller method is subsequently executed. 



看到这里





# 4. :full_moon: Guard







# 5. :full_moon: Interceptor







# 6. Custom Decorator



