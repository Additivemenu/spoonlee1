import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('findUser')
  async getUsers(@Request() req) {
    const userName = req.user.username;
    return this.userService.findOne(userName);
  }

  @Roles(Role.Admin)
  @Get('getUserPassword')
  async getUserPassword(@Request() req) {
    const userName = req.user.username;
    return this.userService.adminFindUserPassword(userName);
  }
}
