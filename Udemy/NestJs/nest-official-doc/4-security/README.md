1

https://docs.nestjs.com/security/authentication







# Key takeaway

+ Review: guards either return boolan or throw exception, all exception thrown by a guard will be handled by exception layer 
+ in authentication & authorisation wokflow, sequence of guards excecution is very important!

+ ExecutionContext 的set metadata 需要被使用, 来支持查找一个route handler的对应的metadata



# Authentication

Let's flesh out our requirements. For this use case, clients will start by authenticating with a username and password. Once authenticated, the server will issue a JWT that can be sent as a [bearer token](https://tools.ietf.org/html/rfc6750) in an authorization header on subsequent requests to prove authentication. We'll also create a protected route that is accessible only to requests that contain a valid JWT.







Jwt

https://jwt.io

+ to issue a jwt token, we need a secret to do digital signature, and this secret is stored on server 
+ use guard, we are able to extract the jwt token from header, and verify it (parse the jwt token string to payload ), then attach the parsed payload to request body so that later route handler can extract useful information from the payload
  + payload usually contains userId, userRole etc. important auth info








Enable AuthGuard globally, 

+ minority of route hanlder can be marked as Public, so that AuthGuard would allow request pass to these public route hanlder
  + this is done by setMetadata ([more about reflection and metadata](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata)) for the route handler using custom decorator, AuthGuard can use Reflector to retrieve the metadata from the ExecutionContext



At last, the AuthGuard looks like

```ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector, // ! used to access metadata
  ) {} // ! guard can also have dependencies

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); // ! get value of key IS_PUBLIC_KEY in metadata from the route handler
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); // ! extract token from header
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // extract payload from token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      //  ! attach the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

related constants:

```ts
// ! Do not expose this key publicly.
export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // ! custom decorator that marks a route as public

```



```ts
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"


curl http://localhost:3000/auth/profile -H "Authorization: Bearer <your jwt token here>"
```







## passport integration

https://docs.nestjs.com/recipes/passport







# Authorisation



## Guards Execution Sequence

Usually, we want to apply the authentication & authorisation related guards to global scope (see [how to apply guards to gloabl app](https://docs.nestjs.com/guards#binding-guards)), if we have multiple guards, what is therir execution sequence?



In NestJS, when you have multiple guards applied to a route, they are executed in the order in which they are specified. This applies to guards set at the method level, controller level, or globally.

Here's how the execution order works:

1. **Method-Level Guards:** If you apply multiple guards to a specific route handler using the `@UseGuards()` decorator, they are executed in the order they are listed.

   ```typescript
   @UseGuards(AuthGuard, RolesGuard)
   @Get()
   myProtectedRoute() {
     // Handler logic...
   }
   ```

   In this example, `AuthGuard` will execute first, followed by `RolesGuard`.

2. **Controller-Level Guards:** If you apply guards at the controller level, they are executed before any method-level guards for all routes within that controller.

   ```typescript
   @UseGuards(ControllerGuard)
   @Controller('my-controller')
   export class MyController {
     @UseGuards(MethodGuard)
     @Get()
     myRoute() {
       // Handler logic...
     }
   }
   ```

   For the `myRoute` method, `ControllerGuard` will execute first, followed by `MethodGuard`.

3. **Global Guards:** Global guards are executed before any controller-level or method-level guards. You typically set global guards in your main application file (`main.ts`) or a module.

   ```typescript
   // In main.ts
   app.useGlobalGuards(new GlobalGuard());
   ```

   A global guard will execute before any other guards applied at the controller or method level.

It's important to note that if any guard returns `false` or throws an exception, the request is denied, and subsequent guards are not executed. Therefore, the order of guards can affect the behavior of your application, especially if the guards have side effects or dependencies on each other.



we could also aggregate multiple guards as one, and declare their execution sequence

```ts
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

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return (
      (await this.authGuard.canActivate(context)) &&
      (await this.rolesGuard.canActivate(context))
    );
  }
}

```







## Basic RBAC

similar to custom decorator we used to mark a route handler as public to skip authentication check, we still use setMetadata for a route handler to declare certain roles to that route handler, and then use guards to acheive RBAC



example implementation is 

AuthGuard (same as what we have in authentication)

+ first look if the target route handler is public, pass if it is public
+ extract jwt token string from header, then verify it, if verify pass then attach the token payload info to the request



RoleGuard

+ extract required role by route handler then cross validate if incoming request mets role requirement

```ts
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
```

at last, we compose AuthGuard and RoleGuard to facilitate apply them to the global scope

```ts
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

```





## Claim-based Authorization

https://docs.nestjs.com/security/authorization#claims-based-authorization

有需要再看



When an identity is created it may be assigned one or more claims issued by a trusted party. A claim is a name-value pair that represents what the subject can do, not what the subject is.

+ e.g. service role in AWS, defining what a service can do 





## Policy-based Authorisation

https://docs.nestjs.com/security/authorization#advanced-implementing-a-policiesguard

有需要再看







# Protection

## Encryption & Hashing



## Helmet





## CORS





## CSRF protection





## Rate limiting