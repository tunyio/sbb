
import {message_publisher} from '@prisma/client'
import {MessagesList} from './messagesList.entity'
import {ArbManagersList} from './arbManagersList.entity'
import {AuctionOrgsIndivList} from './auctionOrgsIndivList.entity'
import {AuctionOrgsLegalList} from './auctionOrgsLegalList.entity'
import {DictSro} from './dictSro.entity'


export class MessagesPublisherList {
  id: number ;
deleted_at: Date  | null;
type: message_publisher ;
arb_manager_id: number  | null;
auction_org_legal_id: number  | null;
auction_org_indiv_id: number  | null;
sro_id: number  | null;
MessagesList?: MessagesList[] ;
ArbManagersList?: ArbManagersList  | null;
AuctionOrgsIndivList?: AuctionOrgsIndivList  | null;
AuctionOrgsLegalList?: AuctionOrgsLegalList  | null;
DictSro?: DictSro  | null;
}
