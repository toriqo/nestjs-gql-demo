import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoicesService } from '../service/invoices.service';
import { CreateInvoiceInput } from '../dto/create-invoice.input';
import { UpdateInvoiceInput } from '../dto/update-invoice.input';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { Prisma, User } from '@prisma/client';

@Resolver('Invoice')
@UseGuards(JwtAuthGuard)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Mutation('createInvoice')
  async create(@Args('createInvoiceInput') createInvoiceInput: CreateInvoiceInput, @CurrentUser() _: Partial<User>) {
    return await this.invoicesService.createInvoice(createInvoiceInput);
  }

  @Query('invoices')
  async findAll(@Args('params') params: { skip?: number, take?: number, cursor?: Prisma.InvoiceWhereUniqueInput, where?: Prisma.InvoiceWhereInput, orderBy?: Prisma.InvoiceOrderByWithRelationInput }, @CurrentUser() currentUser: Partial<User>) {
    return await this.invoicesService.invoices({ ...params, where: { ...params.where, userId: currentUser.id } });
  }

  @Query('invoice')
  async findOne(@Args('id') id: string, @CurrentUser() currentUser: Partial<User>) {
    return await this.invoicesService.invoice({ id: id, userId: currentUser.id });
  }

  @Mutation('updateInvoice')
  async update(@Args('id') id: string, @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput, @CurrentUser() currentUser: Partial<User>) {
    const invoice = await this.invoicesService.invoice({ id });

    if (invoice?.userId !== currentUser.id) {
      return UnauthorizedException;
    }

    return await this.invoicesService.updateInvoice({
      where: { id },
      data: updateInvoiceInput,
    });
  }

  @Mutation('removeInvoice')
  async remove(@Args('id') id: string, @CurrentUser() currentUser: Partial<User>) {
    const invoice = await this.invoicesService.invoice({ id });

    if (invoice?.userId !== currentUser.id) {
      return UnauthorizedException;
    }

    return await this.invoicesService.deleteInvoice({ id: id });
  }
}
