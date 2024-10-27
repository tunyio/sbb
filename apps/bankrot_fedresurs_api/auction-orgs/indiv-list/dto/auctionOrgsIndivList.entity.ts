import { MessagesPublisherList } from 'messages/publisher-list/dto';
import { AuctionOrgsIndivList as AuctionOrgsIndivListGenerated } from '../../../prisma/generated/nestjs-dto/auctionOrgsIndivList.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AuctionsList } from 'auctions/list/dto';

export class AuctionOrgsIndivList
  implements Required<AuctionOrgsIndivListGenerated>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  name_first: string | null;

  @ApiProperty()
  name_second: string | null;

  @ApiProperty()
  name_family: string | null;

  @ApiProperty()
  name_full: string | null;

  @ApiProperty()
  address: string | null;

  // Relations:
  MessagesPublisherList: MessagesPublisherList[];
  AuctionsList: AuctionsList[];
}
