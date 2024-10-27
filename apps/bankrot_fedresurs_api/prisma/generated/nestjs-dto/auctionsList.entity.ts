
import {auctions_type,auctions_status,auctions_price_proposal_submission_form} from '@prisma/client'
import {AuctionOrgsIndivList} from './auctionOrgsIndivList.entity'
import {AuctionOrgsLegalList} from './auctionOrgsLegalList.entity'
import {AuctionsPlatformList} from './auctionsPlatformList.entity'


export class AuctionsList {
  id: number ;
deleted_at: Date  | null;
type: auctions_type  | null;
status: auctions_status  | null;
platform_id: number  | null;
orgs_legal_list_id: number  | null;
orgs_indiv_list_id: number  | null;
property_classifier: string  | null;
price_proposal_submission_form: auctions_price_proposal_submission_form  | null;
AuctionOrgsIndivList?: AuctionOrgsIndivList  | null;
AuctionOrgsLegalList?: AuctionOrgsLegalList  | null;
AuctionsPlatformList?: AuctionsPlatformList  | null;
}
