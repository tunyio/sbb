import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictRegionDto } from '../../prisma/generated/nestjs-dto/update-dictRegion.dto';

@Injectable()
export class RegionService extends PrismaCrudService<UpdateDictRegionDto> {
  constructor(prisma: PrismaService) {
    super(prisma, UpdateDictRegionDto);
  }
}
