import { message_status } from '@prisma/client';
import { MessagesList as MessagesListGenerated } from '../../../prisma/generated/nestjs-dto/messagesList.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DeptorsIndivList } from 'deptors/indiv-list/dto';
import { DeptorsLegalList } from 'deptors/legal-list/dto';
import { DictMessageTypes } from 'dictionaries/message-type/dto';
import { MessagesPublisherList } from 'messages/publisher-list/dto';

export class MessagesList implements Required<MessagesListGenerated> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  updated_at: Date | null;

  deleted_at: Date | null;

  @ApiProperty()
  number: number;

  @ApiProperty()
  message_type_id: number | null;

  @ApiProperty({ enum: message_status })
  status: message_status | null;

  @ApiProperty()
  publication_date: Date;

  @ApiProperty()
  publisher_id: number | null;

  @ApiProperty()
  blocked: boolean | null;

  @ApiProperty()
  blocked_reason: string | null;

  @ApiProperty()
  deptor_legal_id: number | null;

  @ApiProperty()
  deptor_indiv_id: number | null;

  // Relations:
  DeptorsIndivList: DeptorsIndivList | null;
  DeptorsLegalList: DeptorsLegalList | null;
  DictMessageTypes: DictMessageTypes | null;
  MessagesPublisherList: MessagesPublisherList | null;
}
