import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AuctionsList } from 'auctions/list/dto';
import { DictAuctPlatformsSro } from 'dictionaries/auct-platforms-sro/dto';
import { AuctionsPlatformList as AuctionsPlatformListGenerated } from '../../../prisma/generated/nestjs-dto/auctionsPlatformList.entity';

export class AuctionsPlatformList
  implements Required<AuctionsPlatformListGenerated>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  auct_platforms_sro_id: number | null;

  disqualified_persons: Prisma.JsonValue | null;

  // Relations:
  AuctionsList: AuctionsList[];
  DictAuctPlatformsSro: DictAuctPlatformsSro | null;
}
