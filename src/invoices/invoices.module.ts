import { Module } from '@nestjs/common';
import { InvoicesService } from './service/invoices.service';
import { InvoicesResolver } from './resolver/invoices.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [InvoicesResolver, InvoicesService, PrismaService],
})
export class InvoicesModule { }
