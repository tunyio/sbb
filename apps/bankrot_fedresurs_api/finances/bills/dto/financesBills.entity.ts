import { finances_bills_status } from '@prisma/client';
import { FinancesBills as FinancesBillsGenerated } from '../../../prisma/generated/nestjs-dto/financesBills.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FinancesBills implements Required<FinancesBillsGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty({ enum: finances_bills_status })
  status: finances_bills_status | null;
}
