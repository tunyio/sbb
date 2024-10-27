import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictArbitrationCourtsDto as ArbitrationCourtDto } from '../../prisma/generated/nestjs-dto/update-dictArbitrationCourts.dto';

@Injectable()
export class ArbitrationCourtService extends PrismaCrudService<ArbitrationCourtDto> {
  constructor(prisma: PrismaService) {
    super(prisma, ArbitrationCourtDto);
  }
}
