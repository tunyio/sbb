import { DictAuctPlatforms as DictAuctPlatformsGenerated } from '../../../prisma/generated/nestjs-dto/dictAuctPlatforms.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DictAuctPlatforms implements Required<DictAuctPlatformsGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  title: string;
}
