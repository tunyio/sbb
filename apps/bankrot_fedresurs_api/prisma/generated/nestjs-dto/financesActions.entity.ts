
import {finances_actions_type,finances_actions_description} from '@prisma/client'


export class FinancesActions {
  id: number ;
deleted_at: Date  | null;
type: finances_actions_type  | null;
desc: finances_actions_description  | null;
}
