import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateArbManagersReportsDto as ArbManagersReportsDto } from '../../prisma/generated/nestjs-dto/update-arbManagersReports.dto';

@Injectable()
export class ArbManagersReportsService extends PrismaCrudService<ArbManagersReportsDto> {
  constructor(prisma: PrismaService) {
    super(prisma, ArbManagersReportsDto);
  }
}
