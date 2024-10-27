
import {legal_entities_debtors_status} from '@prisma/client'
import {DictRegion} from './dictRegion.entity'
import {MessagesList} from './messagesList.entity'


export class DeptorsLegalList {
  id: number ;
deleted_at: Date  | null;
region_id: number  | null;
category: legal_entities_debtors_status  | null;
name: string  | null;
address: string  | null;
code_inn: string  | null;
code_ogrn: string  | null;
code_okpo: string  | null;
DictRegion?: DictRegion  | null;
MessagesList?: MessagesList[] ;
}
