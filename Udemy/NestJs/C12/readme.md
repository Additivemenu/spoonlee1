1





Continuing the app built in last section of course



# Unit Testing

C12



Let's say we want to perform unit test on `AuthServic` class, 

At normal runtime, AuthService has dependencies on `UserService` which in turn depends on `UserRepo`

<img src="./src_md/DI-1.png" style="zoom:50%;" />

To avoid introducing dependencies, we use mask those dependencies as mock class 

<img src="./src_md/DI-2.png" style="zoom:50%;" />



> unit test file is usually placed inside src/ folder, along with your normal app file, but with extension `.spec.ts`
>
> To run the test file
>
> ```ts
> npm run test:watch		//run all the test files  
> 
>  "test:watch": "jest --watch --maxWorkers=1",  // by default in package.json
> 
> // press p, then type the file name regex pattern to run a specific unit test file
> 
> ```
>
> 



in user folder, create file user.service.spec.ts:

P91-94

```ts
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.server';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
  // ! construct a fake copy of the user service with some fake methods
  // use TypeScript ensure our fake UserService has the same shape as the real one
  const fakeUserService: Partial<UsersService> = {
    // as find(), create() are async methods in real UserService, so we need to return a promise
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };

  // wire up the testing DI container
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUserService }, // ! use mock dependency: tell nest to replace the real UserService with the fake one we just constructed
    ],
  }).compile();

  const service = module.get(AuthService); // cause DI container to create a new AuthService instance

  expect(service).toBeDefined();
});
```



a little bit code layout improvement: 

P95

```ts
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.server';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;		// making the unit to be tested available in good scope

  beforeEach(async () => {
    // ! construct a fake copy of the user service with some fake methods
    // use TypeScript ensure our fake UserService has the same shape as the real one
    const fakeUserService: Partial<UsersService> = {
      // as find(), create() are async methods in real UserService, so we need to return a promise
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    // wire up the testing DI container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService }, // ! use mock dependency: tell nest to replace the real UserService with the fake one we just constructed
      ],
    }).compile();

    service = module.get(AuthService); // cause DI container to create a new AuthService instance
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  
});

```



now let's add some test cases for unit testing `AuthService`

p96-