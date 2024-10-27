import { MessagesList } from 'messages/list/dto';
import { DictMessageTypes as DictMessageTypesGenerated } from '../../../prisma/generated/nestjs-dto/dictMessageTypes.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DictMessageTypes implements Required<DictMessageTypesGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  code: string | null;

  @ApiProperty()
  title: string | null;

  @ApiProperty()
  parent_id: number | null;

  // Relations:
  DictMessageTypes: DictMessageTypes | null;
  other_DictMessageTypes: DictMessageTypes[];
  MessagesList: MessagesList[];
}
