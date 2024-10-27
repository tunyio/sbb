
import {finances_bills_status} from '@prisma/client'


export class FinancesBills {
  id: number ;
deleted_at: Date  | null;
status: finances_bills_status  | null;
}
