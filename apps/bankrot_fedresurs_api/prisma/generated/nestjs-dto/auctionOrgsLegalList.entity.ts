
import {AuctionsList} from './auctionsList.entity'
import {MessagesPublisherList} from './messagesPublisherList.entity'


export class AuctionOrgsLegalList {
  id: number ;
deleted_at: Date  | null;
name: string  | null;
address: string  | null;
AuctionsList?: AuctionsList[] ;
MessagesPublisherList?: MessagesPublisherList[] ;
}
