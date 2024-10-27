import {
  auctions_type,
  auctions_status,
  auctions_price_proposal_submission_form
} from '@prisma/client';
import { AuctionsList as AuctionsListGenerated } from '../../../prisma/generated/nestjs-dto/auctionsList.entity';
import { AuctionOrgsIndivList } from 'auction-orgs/indiv-list/dto';
import { AuctionOrgsLegalList } from 'auction-orgs/legal-list/dto';
import { AuctionsPlatformList } from 'auctions/platform-list/dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuctionsList implements Required<AuctionsListGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty({ enum: auctions_type })
  type: auctions_type | null;

  @ApiProperty({ enum: auctions_status })
  status: auctions_status | null;

  @ApiProperty()
  platform_id: number | null;

  @ApiProperty()
  orgs_legal_list_id: number | null;

  @ApiProperty()
  orgs_indiv_list_id: number | null;

  @ApiProperty()
  property_classifier: string | null;

  @ApiProperty({ enum: auctions_price_proposal_submission_form })
  price_proposal_submission_form: auctions_price_proposal_submission_form | null;

  // Relations:
  AuctionOrgsIndivList: AuctionOrgsIndivList | null;
  AuctionOrgsLegalList: AuctionOrgsLegalList | null;
  AuctionsPlatformList: AuctionsPlatformList | null;
}
