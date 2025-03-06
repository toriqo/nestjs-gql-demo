import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersResolver } from './resolver/users.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule { }
