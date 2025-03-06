import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../service/users.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorator/user.decorator';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput, @CurrentUser() _: Partial<User>) {
    return this.usersService.createUser(createUserInput);
  }

  @Query('users')
  findAll(@CurrentUser() currentUser: Partial<User>) {
    return this.usersService.users({ where: { id: currentUser.id }, omit: { password: true } });
  }

  @Query('user')
  findOne(@Args('id') id: string, @CurrentUser() currentUser: Partial<User>) {
    return this.usersService.user({ id: currentUser.id });
  }

  @Mutation('updateUser')
  update(@Args('id') id: string, @Args('updateUserInput') updateUserInput: UpdateUserInput, @CurrentUser() currentUser: Partial<User>) {
    if (id !== currentUser.id) {
      return UnauthorizedException;
    }

    return this.usersService.updateUser({
      where: { id },
      data: updateUserInput,
    });
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string, @CurrentUser() currentUser: Partial<User>) {
    if (id !== currentUser.id) {
      return UnauthorizedException;
    }

    return this.usersService.deleteUser({ id });
  }
}
