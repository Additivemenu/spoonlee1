import { Test } from '@nestjs/testing';
import { AuthService } from './auth.server';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;

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
