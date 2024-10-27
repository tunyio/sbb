
import {Prisma} from '@prisma/client'




export class CreateAuctionsPlatformListDto {
  deleted_at?: Date;
disqualified_persons?: Prisma.InputJsonValue;
}
