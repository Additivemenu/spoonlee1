import { Injectable } from '@nestjs/common';

import { Role } from 'src/auth/roles.enum';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'johnPassword',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'mariaPassword',
      roles: [Role.User],
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
