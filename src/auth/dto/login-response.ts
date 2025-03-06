import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponse {
    @IsNotEmpty()
    @IsString()
    authToken: string;
}