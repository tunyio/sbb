import { message_publisher } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { MessagesPublisherList as MessagesPublisherListGenerated } from '../../../prisma/generated/nestjs-dto/messagesPublisherList.entity';
import { ArbManagersList } from 'arb-managers/list/dto';
import { MessagesList } from 'messages/list/dto';
import { AuctionOrgsIndivList } from 'auction-orgs/indiv-list/dto';
import { AuctionOrgsLegalList } from 'auction-orgs/legal-list/dto';
import { DictSro } from 'dictionaries/sro/dto';

export class MessagesPublisherList
  implements Required<MessagesPublisherListGenerated>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty({ enum: message_publisher })
  type: message_publisher | null;

  @ApiProperty()
  arb_manager_id: number | null;

  @ApiProperty()
  auction_org_legal_id: number | null;

  @ApiProperty()
  auction_org_indiv_id: number | null;

  @ApiProperty()
  sro_id: number | null;

  // Relations:
  MessagesList: MessagesList[];
  ArbManagersList: ArbManagersList | null;
  AuctionOrgsIndivList: AuctionOrgsIndivList | null;
  AuctionOrgsLegalList: AuctionOrgsLegalList | null;
  DictSro: DictSro | null;
}
