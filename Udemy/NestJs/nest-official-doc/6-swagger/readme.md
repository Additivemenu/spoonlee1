1





basically, we could use decorator (normally, the decorators starts with `@Api`) to class's property or method to tell swagger the info about it, then these info will be displayed in SwaggerUI



:gem: ​there is a working example under the same directory



## Getting started

https://docs.nestjs.com/openapi/introduction





## Types & Parameters

explain how to use decorators to info SwaggerUI about type & parameter-related information



`@ApiProperty({})`

---





`@ApiBody()`

---

Since TypeScript does not store metadata about generics or interfaces, when you use them in your DTOs, `SwaggerModule`may not be able to properly generate model definitions at runtime.  (It feels like a bit redundant in nest, Java would be able to read property directly?) For instance, the following code won't be correctly inspected by the Swagger module:

```ts
createBulk(@Body() usersDto: CreateUserDto[])
```

In order to overcome this limitation, you can set the type explicitly:

```ts
@ApiBody({ type: [CreateUserDto] })
createBulk(@Body() usersDto: CreateUserDto[])
```





enum

---

```ts
@ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
role: UserRole;
```



```ts
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

@ApiQuery({ name: 'role', enum: UserRole })
async filterByRole(@Query('role') role: UserRole = UserRole.User) {}
```



Raw definitions 

---







Extra models

---







oneOf, manyOf, allOf

---





## :bangbang: ​Operations

https://docs.nestjs.com/openapi/operations