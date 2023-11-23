# Generating nest project using CLI

```js
npm install -g @nestjs/cli
```




App goal: store and retrieve messages stored in a plain json file



<img src="../C2/src_md/scratch2.png" style="zoom:50%;" />

+ API 1: get all message from server
  + Controller + Service + Repository
+ API 2: post a new message to server 
  + Pipe + Controlelr + Service + Repository
+ API 3:  get a message by id from server





## Hands-on

```js
nest new <project-name> // this by default create a directory that is init as a git repo
  
nest new <project-name> --skip-git		// this will not

```



package.json

```json

  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",		// npm run start:dev => run app as dev mode
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
```



nest uses eslint by default, but lecturer turn it off



a nest app at least needs to have a module and a controller

## Create module

we can use nest CLI to generate classes file or module file more conveniently

```js
// at root path of the project: 
nest generate module <module-name>
```





## Create controller 

```js
// at root path of the project: 
nest generate controller messages/messages --flat
```

this generate messages controller under messages folder and wire it up to the messages module we just created. `--flat` means 'don't create an extra folder called controllers



# Validating Request Data with Pipes 

C4

nest also have different decorators to extract info from different parts of a http request

+ `Headers()`
+ `@Body()`
+ `@Param('id')`
+ `@Query()`





## Using Pipes for Validation





## Adding validation rules

steps to set up automatic validation

1. tell nest to use global validation
2. create a class that describes the different properties that the request body should have
   + Dto (data transfer object)
3. add validation rules to the class
4. apply that class to the request handler

写法和SpringBoot如出一辙



main.ts

+ need class-validator & class-transformer package

```ts
import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  
  app.useGlobalPipes(
    new ValidationPipe()
  );    // dependency injection here
  
  await app.listen(3000);
}
bootstrap();
```



messages > messages.module.ts

```ts
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController]
})
export class MessagesModule {}
```

messages > messages.controller.ts

```ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {

    @Get()
    listMessages() {
        return [{ id: 1, text: 'Hello World' }];
    }   
		
  	// how does Dto type preserved in javascript at runtime? 
    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        console.log(body);
    }

    @Get('/:id')
    getMessage(@Param('id') id: string) {
        console.log(id);
    }

}
```

messages > dtos > create-message.dto.ts

```ts
import {IsString} from 'class-validator';

export class CreateMessageDto{
    @IsString()
    content: string;
}
```





## Behind the scenes of validation

P20

Data Transfer Object: http request body 到 request handler之间的中间信息状态, 

+ `class-transformer`: responsible for deserialization process - plain JSON data to JS class instance
+ `class-validator`: checking field of a JS class instance against a validation rule using decorators



```ts
request body in JSON --class-transformer--> 
specific Dto instance --class-validator--> 
 if no error
 	form to request handler
 else 
   return error to client
```



how type info of typescript is perserved when running compiled javascript code

---

p21

TS code not gets run directly, but be converted to JS first => how does the decorator info in TS works in JS context? 



dist > corresponding to message.controller.ts file, it has code pieces of: 

+ it defines how those decorators works when compiling TS to JS

```js
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createMessage", null);
```





# Services & Repositories 

C5 1hr







# Organizing Code with modules 

C6 30min
