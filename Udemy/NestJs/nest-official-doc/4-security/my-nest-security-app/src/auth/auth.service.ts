import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // used for issue JWT
  ) {}

  /**
   * check if user exists and password is correct, if so issue JWT token  back to user
   * @param username
   * @param pass
   * @returns  JWT token as string
   */
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      console.log('uhh, user not found!');
      throw new NotFoundException();
    }
    if (user.password !== pass) {
      console.log('uhh, password not match!');
      console.log(`correct password is ${user.password} but got ${pass}`);
      throw new UnauthorizedException('username or password not match!');
    }

    const payload = {
      sub: user.userId,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload), // ! issue JTW token
    };
  }
}
