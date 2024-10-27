
import {message_status} from '@prisma/client'
import {DeptorsIndivList} from './deptorsIndivList.entity'
import {DeptorsLegalList} from './deptorsLegalList.entity'
import {DictMessageTypes} from './dictMessageTypes.entity'
import {MessagesPublisherList} from './messagesPublisherList.entity'


export class MessagesList {
  id: number ;
updated_at: Date  | null;
deleted_at: Date  | null;
number: number ;
message_type_id: number  | null;
status: message_status  | null;
publication_date: Date ;
publisher_id: number ;
blocked: boolean  | null;
blocked_reason: string  | null;
deptor_legal_id: number  | null;
deptor_indiv_id: number  | null;
DeptorsIndivList?: DeptorsIndivList  | null;
DeptorsLegalList?: DeptorsLegalList  | null;
DictMessageTypes?: DictMessageTypes  | null;
MessagesPublisherList?: MessagesPublisherList ;
}
