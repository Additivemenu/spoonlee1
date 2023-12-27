







# key takeaways

+ TypeORM apis

  + some api supports passing entity as argument, this will enabled hooks in Entity but less efficient as 2 trips to db

  + some api do not support entity as argument but just plain object, this will not enabled hooks in Entity, but more efficient as 1 trip to db

    

# Project Intro

C7

start to build a new project with simple CRUD



App overview

+ Authentication: user sign up with email/password
+ Business: 
  + Users get an estimate for how much their car is worth based on the make/model/year/mileage
  + User can report what they sold their vehicles for

+ Access Control: admins have to approve reported sales





API design & Module design

```ts
User Module -> UserController, UserService, UserRepository
  POST /auth/signup
    - body {email, passowrd}
  POST /auth/signin
    - body {email, password}

Report Module -> ReportController, ReportService, ReportRepository
  GET /reports
    - get {make, model, year, mileage, longitute, latitude }
  POST /reports
    - body {make, model, year, mileage, longitute, latitude, price}
  PATCH /reports/:id
    - {approved}
```



create a new project

```ts
nest new mycv --skip-git

// cd to the project root path
nest g module users
nest g module reports
  
nest g controller users
nest g controller reports
  
nest g service users
nest g service reports
```





# Persisting data with TypeORM

C8



## setup database connection 

Nest works well with TypeORM AND Mongoose. Here we just use TypeORM with sqlite, we will move to use Postgres later on



<img src="./src_md/setup-connection1.png" style="zoom:50%;" />



```js
npm i @nestjs/typeorm typeorm sqlite3
```

in app module (the root module of project), add TypeOrmModule in import and config it as:

````ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
````

now when you run `npm run start:dev`, you will see sqlite database file created!







## Creating an entity and repository

p44 

a lot wiring stuff to do with modules in nest.js



Users module folder > user.entity.ts

+ define database table structure in ts fashion, corresponds to a sql table

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
```



Wire it up to its parent module (user module)

+ this creates a repository

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],   // this connects the entity to its parent module -> this creates a repository for the entity
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
```



Wire it up to the root module (app module)

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],			// ****
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```



similar process for report entity (not showing the code here)



also possible to view db.sqlite file in vscode (using sqlite extension)



## Understanding TypeORM Decorators

P46



app.module.ts

+ synchronize: true
  + note this config is only used in development. we never want this config in production as it is dangerious to accidently change the database structure  
  + in production, we would need to write a migration file to define how to do database migration

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true, // ! only in development mode, serves as the same purpose as database migration (this is a special case in TypeORM, normally you would use migrations in other ORM)
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```





quick note on repository

repository APIs https://typeorm.io/data-source

+ there may be more than 1 way to do a task

```ts
create()
save()

find()
findOne()

remove()
```



setting up body validation for create-user

+ just similar step to the last notes C3-6, not show code here



# Creating & Saving User data

C9

CRUD user apis



## Create

controller -> service -> repository



in user service, we define business logic how to create a user

+ Note we use user repository to create a new user instance, instead of mannually create one using `new`, because it is safer in this way

```ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo; // dependency injection
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });     // create a new user instance using repo (this is safer as validation rule is applied), but not persist it to DB
    return this.repo.save(user);
  }
}
```



review on the workflow

P52

<img src="./src_md/create-user-flow1.png" style="zoom:50%;" />



hooks to entity

P53

:bangbang: a good practice: create entity instance and save the entity instance, don't create plain instance as you may lose some code logic like hooks in an Entity

```ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo; // dependency injection
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });     // create a new user instance using repo (this is safer as validation rule is applied), but not persist it to DB
    return this.repo.save(user);        // this saves a User Entity instance to db, not a plain user object, so hooks to the entity will be called
  }
}
```



e.g. we can add additional hooks to entity 

```ts
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // like AOP in spring, this is a hook that will be called after insert
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
```





## Query 

P55







## :bangbang:Update

P56

Save() vs insert() & update() 

+ Save()
  + also can be applied on entity instance => hooks to that entity enabled
  + but less efficient as it need 2 trips: retieve entity from db, update it, then save it back to db
+ insert() & update()
  + can only be applied on plain instance
  + 1 trip to db, more efficient



in user service class:

```ts
  // Partial comes from typescript, it declares a type consisting of any partial fields of User, providing flexibilities
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);        // entity
    if (!user) {
      throw new Error('user not found!');
    }

    Object.assign(user, attrs);     // assign partial fields to user
    return this.repo.save(user);    // save entity, apply hooks
  }
```





## Remove

P57

Again: remove() vs. delete()

+ remove() is for removing entity
  + Entity -> hooks enabled
  + but less efficient as 2 way trip to db
+ Delete() is more flexible for plain instance



```ts
  async remove(id: number) {
    const user = await this.findOne(id);        // entity
    if (!user) {
      throw new Error('user not found!');
    }
    return this.repo.remove(user);    // remove entity, apply hooks
  }
```









## Adding service to contoller

P58



user controller

```ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth') // prefix for all routes inside this controller
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    //! here we validate the body using CreateUserDto
    // create a new user
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() attrs: UpdateUserDto) {
    return this.usersService.update(parseInt(id), attrs);
  }
}
```



## :bangbang: Exceptions handling

usually, the expcetion is return back to controller from service



<img src="./src_md/exception1.png" style="zoom:50%;" />



e.g. in user service 

+ we throw a specific type of HTTP exception, instead of just `throw new Error('')`
  + :bangbang: note but protocols other than HTTP (e.g. WebSocket, gRPC) ´might not know how to handle http exceptions,  you would need to use protocol specific exception or implement your own exception filters 

```ts
 
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
  private repo: Repository<User>;

  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo; // dependency injection
  }
  
  
  // ........
  
// Partial comes from typescript, it declares a type consisting of any partial fields of User, providing flexibilities
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);        // entity
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    Object.assign(user, attrs);     // assign partial fields to user
    return this.repo.save(user);    // save entity, apply hooks
  }

  async remove(id: number) {
    const user = await this.findOne(id);        // entity
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return this.repo.remove(user);    // remove entity, apply hooks
  }
  
}
```





# Custom data serialization

C10

This means to customize what field of entity is accessible by response data



## one way is to use Interceptors

p62



demo code



## solution to serialization

P63

custom interceptor:  use dto to define how to serialize an entity for a particular route handler



build custom interceptor

P64

看到这里





# Authentication starts from scratch