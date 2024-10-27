import { individuals_debtors_status } from '@prisma/client';
import { DeptorsIndivList as DeptorsIndivListGenerated } from '../../../prisma/generated/nestjs-dto/deptorsIndivList.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DictRegion } from 'dictionaries/region/dto';
import { MessagesList } from 'messages/list/dto';

export class DeptorsIndivList implements Required<DeptorsIndivListGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  region_id: number | null;

  @ApiProperty({ enum: individuals_debtors_status })
  category: individuals_debtors_status | null;

  @ApiProperty()
  name_first: string | null;

  @ApiProperty()
  name_second: string | null;

  @ApiProperty()
  name_family: string | null;

  @ApiProperty()
  address: string | null;

  @ApiProperty()
  code_inn: string | null;

  @ApiProperty()
  code_ogrnip: string | null;

  @ApiProperty()
  code_snils: string | null;

  // Relations:
  DictRegion: DictRegion | null;
  MessagesList: MessagesList[];
}
