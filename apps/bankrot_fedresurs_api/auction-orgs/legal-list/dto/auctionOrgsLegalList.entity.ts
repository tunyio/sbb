import { MessagesPublisherList } from 'messages/publisher-list/dto';
import { AuctionOrgsLegalList as AuctionOrgsLegalListGenerated } from '../../../prisma/generated/nestjs-dto/auctionOrgsLegalList.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AuctionsList } from 'auctions/list/dto';

export class AuctionOrgsLegalList
  implements Required<AuctionOrgsLegalListGenerated>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  address: string | null;

  // Relations:
  MessagesPublisherList: MessagesPublisherList[];
  AuctionsList: AuctionsList[];
}
