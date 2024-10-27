import { CreateAuctionsPlatformListDto as CreateAuctionsPlatformListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-auctionsPlatformList.dto';
import { Prisma } from '@prisma/client';

export class CreateAuctionsPlatformListDto
  implements Required<CreateAuctionsPlatformListDtoGenerated>
{
  deleted_at: Date;

  disqualified_persons: Prisma.InputJsonValue;
}
