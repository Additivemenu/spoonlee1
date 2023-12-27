import {IsEmail, IsString, IsOptional} from 'class-validator'

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()   // it will still pass validation if the email is not present
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}