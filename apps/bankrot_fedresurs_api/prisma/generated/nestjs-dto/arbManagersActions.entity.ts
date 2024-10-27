
import {arb_manager_actions_type,arb_manager_actions_description} from '@prisma/client'
import {ArbManagersList} from './arbManagersList.entity'


export class ArbManagersActions {
  id: number ;
deleted_at: Date  | null;
arb_manager_id: number ;
type: arb_manager_actions_type  | null;
desc: arb_manager_actions_description  | null;
ArbManagersList?: ArbManagersList ;
}
