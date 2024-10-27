import { DeptorsIndivList } from 'deptors/indiv-list/dto';
import { DictRegion as DictRegionGenerated } from '../../../prisma/generated/nestjs-dto/dictRegion.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DeptorsLegalList } from 'deptors/legal-list/dto';

export class DictRegion implements Required<DictRegionGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  okato_oktmo_code: string | null;

  @ApiProperty()
  title: string | null;

  // Relations:
  DeptorsIndivList: DeptorsIndivList[];
  DeptorsLegalList: DeptorsLegalList[];
}
