1





# 1. Controller 

A controller's purpose is to receive specific requests for the application. The **routing** mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.



## request objects

https://docs.nestjs.com/controllers#request-object

listed common used decorators to extract request object



## decorators in a controller

`@HttpCode(...)`

```ts
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```



`@Header()`

```ts
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```



`@Redirect()`

```ts
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}

```



`@Param()`

```ts
@Get(':id')
findOne(@Param() params: any): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```



`@Body()`

```ts
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```



```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```









# 2. Provider

`Providers` (in SpringBoot, it is Bean) are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be **injected** as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.



Dependency Injection

---

+ constructor-based
  + usually, we should use this
+ Property-based
  + less used, unless you have a long inheritance chain



Lifecylce of a provider 

---

Providers normally have a lifetime ("scope") synchronized with the application lifecycle. 

When the application is bootstrapped, every dependency must be resolved, and therefore every provider has to be instantiated. Similarly, when the application shuts down, each provider will be destroyed. 

However, there are ways to make your provider lifetime **request-scoped** as well. You can read more about these techniques [here](https://docs.nestjs.com/fundamentals/injection-scopes).





provider registration

---

you need to register the provider in the module

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```







# 3. Module

https://docs.nestjs.com/modules

more inspired by Angular.js, not a featuer in SpringBoot

A module is a class annotated with a `@Module()` decorator. The `@Module()` decorator provides metadata that **Nest** makes use of to organize the application structure.

The `@Module()` decorator takes a single object whose properties describe the module:

| `providers`   | the providers that will be instantiated by the Nest injector and that may be shared at least across this module |
| ------------- | ------------------------------------------------------------ |
| `controllers` | the set of controllers defined in this module which have to be instantiated |
| `imports`     | the list of imported modules that export the providers which are required in this module |
| `exports`     | the subset of `providers` that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (`provide` value) |



## shared module

In Nest, modules are **singletons** by default, and thus you can share the same instance of any provider between multiple modules effortlessly.

Every module is automatically a **shared module**. Once created it can be reused by any module. Let's imagine that we want to share an instance of the `CatsService` between several other modules. In order to do that, we first need to **export** the `CatsService` provider by adding it to the module's `exports` array, as shown below:

```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```

Now any module that imports the `CatsModule` has access to the `CatsService` and will share the same instance with all other modules that import it as well.





## Global module

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module **global** with the `@Global()` decorator.

```ts
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

The `@Global()` decorator makes the module global-scoped. Global modules should be registered **only once**, generally by the root or core module.



## :bangbang: ​Dynamic module

sometime, we don't want a module's configuration is hard-coded, in this case we could use dynamic module to create configurable and reusable module

+ e.g. use cases: database module, logging module, cache module, authentication module



:gem: a demo​

In Nest.js, the `@Module()` decorator is used to define a module, which is a class that serves as a container for a group of related components, services, and other modules. The `imports` array in the `@Module()` decorator is used to import other modules that the current module depends on.

Dynamic modules in Nest.js allow you to create modules that can be customized based on certain conditions or parameters. They enable you to define modules that can be configured and imported dynamically at runtime.

Here's an example of a dynamic module in Nest.js:

```typescript
import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static forRoot(uri: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: uri,
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
```

In this example, the `DatabaseModule` is defined as a dynamic module. It has a static method called `forRoot` that takes a `uri` parameter, which represents the database connection URI.

Inside the `forRoot` method, we return an object that represents the dynamic module configuration. The `module` property specifies the module class (`DatabaseModule` in this case), and the `providers` array defines the providers that should be included in the module. In this example, we define a provider named `'DATABASE_CONNECTION'` and set its value to the `uri` parameter.

The `exports` array specifies the providers that should be made available to other modules that import this dynamic module.

To use this dynamic module in another module, you can import it like this:

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule.forRoot('mongodb://localhost:27017/mydb')],
})
export class AppModule {}
```

In the `AppModule`, we import the `DatabaseModule` using the `forRoot` method and provide the desired database connection URI as an argument.

By using dynamic modules, you can create flexible and configurable modules that can be customized based on specific needs or runtime conditions. This allows for better modularity and reusability in your Nest.js application.















