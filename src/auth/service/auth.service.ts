import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { UsersService } from 'src/users/service/users.service';
import { LoginResponse } from '../dto/login-response';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.validateUser({ email });

        if (user && await argon2.verify(user.password, password)) {
            return user;
        }

        throw new UnauthorizedException();
    }

    async login(user: User): Promise<LoginResponse> {
        const payload = { sub: user.id, email: user.email };
        const authToken = await this.jwtService.signAsync(payload)

        if (!authToken) {
            throw new InternalServerErrorException('Auth token generation failed');
        }

        return { authToken };
    }
}