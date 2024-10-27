import { legal_entities_debtors_status } from '@prisma/client';
import { DeptorsLegalList as DeptorsLegalListGenerated } from '../../../prisma/generated/nestjs-dto/deptorsLegalList.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MessagesList } from 'messages/list/dto';
import { DictRegion } from 'dictionaries/region/dto';

export class DeptorsLegalList implements Required<DeptorsLegalListGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  region_id: number | null;

  @ApiProperty({ enum: legal_entities_debtors_status })
  category: legal_entities_debtors_status | null;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  address: string | null;

  @ApiProperty()
  code_inn: string | null;

  @ApiProperty()
  code_ogrn: string | null;

  @ApiProperty()
  code_okpo: string | null;

  // Relations:
  DictRegion: DictRegion | null;
  MessagesList: MessagesList[];
}
