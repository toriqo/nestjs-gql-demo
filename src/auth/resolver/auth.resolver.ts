import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guard/gql-auth.guard';
import { LoginUserInput } from '../dto/login.input';
import { LoginResponse } from '../dto/login-response';

@Resolver('LoginResponse')
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation('login')
    @UseGuards(GqlAuthGuard)
    async login(@Args('loginUserInput') _: LoginUserInput, @Context() context: any): Promise<LoginResponse> {
        return await this.authService.login(context.req.user);
    }
}
