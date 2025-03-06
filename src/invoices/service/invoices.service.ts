import { Injectable } from '@nestjs/common';
import { CreateInvoiceInput } from '../dto/create-invoice.input';
import { UpdateInvoiceInput } from '../dto/update-invoice.input';
import { PrismaService } from 'src/prisma.service';
import { Invoice, Prisma } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) { }

  async invoice(invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput,): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: invoiceWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  async invoices(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.invoice.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
      },
    });
  }

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.prisma.invoice.create({
      data,
    });
  }

  async updateInvoice(params: { where: Prisma.InvoiceWhereUniqueInput, data: Prisma.InvoiceUpdateInput }): Promise<Invoice> {
    const { where, data } = params;
    return this.prisma.invoice.update({
      data,
      where,
    });
  }

  async deleteInvoice(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
    return this.prisma.invoice.delete({
      where,
    });
  }
}
