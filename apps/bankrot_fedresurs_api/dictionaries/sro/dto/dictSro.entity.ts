import { ArbManagersList } from 'arb-managers/list/dto';
import { DictSro as DictSroGenerated } from '../../../prisma/generated/nestjs-dto/dictSro.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MessagesPublisherList } from 'messages/publisher-list/dto';
import { sro_document_type } from '@prisma/client';

export class DictSro implements Required<DictSroGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  code: string | null;

  @ApiProperty()
  title: string | null;

  @ApiProperty()
  register_number: string | null;

  @ApiProperty()
  document_type: sro_document_type | null;

  // Relations:
  ArbManagersList: ArbManagersList[];
  MessagesPublisherList: MessagesPublisherList[];
}
