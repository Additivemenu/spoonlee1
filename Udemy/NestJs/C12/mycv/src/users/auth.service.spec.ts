import { Test } from '@nestjs/testing';
import { AuthService } from './auth.server';
import { UsersService } from './users.service';
import { User } from './user.entity';

import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService; // the unit under test
  let fakeUserService: Partial<UsersService>; // fake copy of the user service

  // beforeEach() is a hook that runs before each test case: we wire up the testing DI container
  beforeEach(async () => {
    // ! construct a fake copy of the user service (the dependency in the unit under test) with some fake methods
    // use TypeScript ensure our fake UserService has the same shape as the real one
    const users: User[] = []; // this is a fake database
    fakeUserService = {
      // as find(), create() are async methods in real UserService, so we need to return a promise
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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

  /**
   * test cases ==============================================
   * first figure out what we want to test: a list of scenarios
   * 1. simulate test function
   * 2. declare expected results
   */

  // test case1
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  // test case2
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf'); // simulate a user signing up

    // declare expected results
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  // test case3
  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdflkj@asdlfkj.com', 'passdflkj');

    await expect(
      service.signup('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(BadRequestException);
  });

  // test case4
  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('asdf@asdf.com', 'passdword')).rejects.toThrow(
      NotFoundException,
    );
  });

  // test csae5 - till p102
  it('throw if an invalid password is provided', async () => {
    await service.signup('laskk@akga.com', 'password');

    await expect(
      service.signin('laskk@akga.com', 'wrongpassword'),
    ).rejects.toThrow(BadRequestException);
  });

  // test case6
  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');
    const user = await service.signin('asdf@asdf.com', 'mypassword');

    expect(user).toBeDefined();
  });

  //
});
