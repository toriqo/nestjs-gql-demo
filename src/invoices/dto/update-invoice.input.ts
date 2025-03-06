import { IsNotEmpty, IsString } from 'class-validator';
import { CreateInvoiceInput } from './create-invoice.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
}
