





# Project Intro

C7

start to build a new project



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

up here







# Custom data serialization







# Authentication starts from scratch