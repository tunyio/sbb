import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictAuctPlatformsDto as AuctPlatformsDto } from '../../prisma/generated/nestjs-dto/update-dictAuctPlatforms.dto';

@Injectable()
export class AuctPlatformsService extends PrismaCrudService<AuctPlatformsDto> {
  constructor(prisma: PrismaService) {
    super(prisma, AuctPlatformsDto);
  }
}
