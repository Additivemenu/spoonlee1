import { Controller, Post, Body } from '@nestjs/common';
import {CreateUserDto} from './dtos/create-user-dto'


@Controller('auth')        // prefix for all routes inside this controller
export class UsersController {

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        // create a new user
        console.log(body);
    }


}
