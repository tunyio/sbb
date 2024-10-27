import { AuctionsPlatformList } from 'auctions/platform-list/dto';
import { DictAuctPlatformsSro as DictAuctPlatformsSroGenerated } from '../../../prisma/generated/nestjs-dto/dictAuctPlatformsSro.entity';
import { ApiProperty } from '@nestjs/swagger';

export class DictAuctPlatformsSro
  implements Required<DictAuctPlatformsSroGenerated>
{
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  register_number: string | null;

  // Relations:
  AuctionsPlatformList: AuctionsPlatformList[];
}
