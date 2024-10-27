import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateAuctionsPlatformListDto as AuctionsPlatformListEntity } from '../../prisma/generated/nestjs-dto/update-auctionsPlatformList.dto';

@Injectable()
export class AuctionsPlatformListService extends PrismaCrudService<AuctionsPlatformListEntity> {
  constructor(prisma: PrismaService) {
    super(prisma, AuctionsPlatformListEntity);
  }
}
