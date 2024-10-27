import { MessagesPublisherList } from 'messages/publisher-list/dto';
import { ArbManagersList as ArbManagersListGenerated } from '../../../prisma/generated/nestjs-dto/arbManagersList.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DictSro } from 'dictionaries/sro/dto';
import { ArbManagersActions } from 'arb-managers/actions/dto';
import { ArbManagersReports } from 'arb-managers/reports/dto';

export class ArbManagersList
  implements Omit<Required<ArbManagersListGenerated>, 'UsersList'>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  name_first: string | null;

  @ApiProperty()
  name_second: string | null;

  @ApiProperty()
  name_family: string | null;

  @ApiProperty()
  name_full: string | null;

  @ApiProperty()
  registry_number: string | null;

  @ApiProperty()
  sro_id: number | null;

  // Relations:
  // UsersList?: UsersList;
  DictSro: DictSro | null;
  MessagesPublisherList: MessagesPublisherList[];
  ArbManagersActions: ArbManagersActions | null;
  ArbManagersReports: ArbManagersReports | null;
}
