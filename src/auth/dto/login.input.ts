import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserInput {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}