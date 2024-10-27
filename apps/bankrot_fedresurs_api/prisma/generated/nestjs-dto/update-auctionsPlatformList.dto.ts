
import {Prisma} from '@prisma/client'




export class UpdateAuctionsPlatformListDto {
  deleted_at?: Date;
disqualified_persons?: Prisma.InputJsonValue;
}
