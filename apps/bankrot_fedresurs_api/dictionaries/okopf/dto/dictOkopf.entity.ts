import { DictOkopf as DictOkopfGenerated } from '../../../prisma/generated/nestjs-dto/dictOkopf.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DictOkopf implements Required<DictOkopfGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  code: number | null;

  @ApiProperty()
  title: string | null;

  @ApiProperty()
  canceled: boolean | null;

  @ApiProperty()
  parent_id: number | null;

  // Relations:
  DictOkopf: DictOkopf | null;
  other_DictOkopf: DictOkopf[];
}
