import { DictArbitrationCourts as DictArbitrationCourtsGenerated } from '../../../prisma/generated/nestjs-dto/dictArbitrationCourts.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DictArbitrationCourts
  implements Required<DictArbitrationCourtsGenerated>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  title: string | null;
}
