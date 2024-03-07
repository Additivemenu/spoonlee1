import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.server';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    setColor(color: string, session: any): void;
    getColor(session: any): any;
    signOut(session: any): void;
    whoAmI(user: User): User;
    createUser(body: CreateUserDto, session: any): Promise<User>;
    signin(body: CreateUserDto, session: any): Promise<User>;
    findUser(id: string): Promise<User>;
    findAllUsers(email: string): Promise<User[]>;
    removeUser(id: string): Promise<User>;
    updateUser(id: string, attrs: UpdateUserDto): Promise<User>;
}
