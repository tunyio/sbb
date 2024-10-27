
import {AuctionsList} from './auctionsList.entity'
import {MessagesPublisherList} from './messagesPublisherList.entity'


export class AuctionOrgsIndivList {
  id: number ;
deleted_at: Date  | null;
name_first: string  | null;
name_second: string  | null;
name_family: string  | null;
name_full: string  | null;
address: string  | null;
AuctionsList?: AuctionsList[] ;
MessagesPublisherList?: MessagesPublisherList[] ;
}
