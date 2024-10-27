import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateAuctionsListDto as AuctionsListEntity } from '../../prisma/generated/nestjs-dto/update-auctionsList.dto';

@Injectable()
export class AuctionsListService extends PrismaCrudService<AuctionsListEntity> {
  constructor(prisma: PrismaService) {
    super(prisma, AuctionsListEntity);
  }
}
