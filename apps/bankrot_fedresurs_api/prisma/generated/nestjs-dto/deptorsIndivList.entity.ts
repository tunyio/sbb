
import {individuals_debtors_status} from '@prisma/client'
import {DictRegion} from './dictRegion.entity'
import {MessagesList} from './messagesList.entity'


export class DeptorsIndivList {
  id: number ;
deleted_at: Date  | null;
region_id: number  | null;
category: individuals_debtors_status  | null;
name_first: string  | null;
name_second: string  | null;
name_family: string  | null;
address: string  | null;
code_inn: string  | null;
code_ogrnip: string  | null;
code_snils: string  | null;
DictRegion?: DictRegion  | null;
MessagesList?: MessagesList[] ;
}
