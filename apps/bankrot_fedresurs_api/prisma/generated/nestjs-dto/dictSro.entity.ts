
import {sro_document_type} from '@prisma/client'
import {ArbManagersList} from './arbManagersList.entity'
import {MessagesPublisherList} from './messagesPublisherList.entity'


export class DictSro {
  id: number ;
deleted_at: Date  | null;
code: string ;
title: string ;
register_number: string  | null;
document_type: sro_document_type  | null;
ArbManagersList?: ArbManagersList[] ;
MessagesPublisherList?: MessagesPublisherList[] ;
}
