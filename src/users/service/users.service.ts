import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async reqUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput,): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput, select: { id: true, name: true, email: true } });
  }

  async validateUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput, include: { invoices: true }, omit: { password: true } });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    omit?: Prisma.UserOmit,
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy, omit } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      omit,
      include: {
        invoices: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: { where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }): Promise<Partial<User> | null> {
    const { where, data } = params;
    if (data.password) {
      if (typeof data.password === 'string') {
        data.password = await argon2.hash(data.password);
      }
    }

    return this.prisma.user.update({ data, where, omit: { password: true } });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
