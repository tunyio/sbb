import { UpdateAuctionsPlatformListDto as UpdateAuctionsPlatformListDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-auctionsPlatformList.dto';
import { Prisma } from '@prisma/client';

export class UpdateAuctionsPlatformListDto
  implements Required<UpdateAuctionsPlatformListDtoGenerated>
{
  deleted_at: Date;

  disqualified_persons: Prisma.InputJsonValue;
}
