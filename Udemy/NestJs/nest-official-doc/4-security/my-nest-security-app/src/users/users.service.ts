import { Injectable } from '@nestjs/common';
// import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'adam',
      password: 'adam',
      roles: [Role.Admin, Role.Marker, Role.TestDeveloper],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'maria',
      roles: [Role.Marker],
    },
    {
      userId: 3,
      username: 'tony',
      password: 'tony',
      roles: [Role.TestDeveloper],
    },
    {
      userId: 3,
      username: 'tom',
      password: 'tom',
      roles: [Role.TestDeveloper, Role.Marker],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);
    return user;
  }

  async findUserPassword(username: string): Promise<string | undefined> {
    const user = this.users.find((user) => user.username === username);
    user.password = 'uhh, you cannot see user password';
    return user.password;
  }

  async adminFindUserPassword(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);
    return user.password;
  }
}
