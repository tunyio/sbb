import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictAuctPlatformsSroDto as AuctPlatformsSroDto } from '../../prisma/generated/nestjs-dto/update-dictAuctPlatformsSro.dto';

@Injectable()
export class AuctPlatformsSroService extends PrismaCrudService<AuctPlatformsSroDto> {
  constructor(prisma: PrismaService) {
    super(prisma, AuctPlatformsSroDto);
  }
}
