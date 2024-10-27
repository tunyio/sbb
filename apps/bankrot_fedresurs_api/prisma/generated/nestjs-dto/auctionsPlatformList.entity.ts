
import {Prisma} from '@prisma/client'
import {AuctionsList} from './auctionsList.entity'
import {DictAuctPlatformsSro} from './dictAuctPlatformsSro.entity'


export class AuctionsPlatformList {
  id: number ;
deleted_at: Date  | null;
auct_platforms_sro_id: number  | null;
disqualified_persons: Prisma.JsonValue  | null;
AuctionsList?: AuctionsList[] ;
DictAuctPlatformsSro?: DictAuctPlatformsSro  | null;
}
