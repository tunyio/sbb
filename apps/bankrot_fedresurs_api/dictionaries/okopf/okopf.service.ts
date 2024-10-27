import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictOkopfDto as OkopfDto } from '../../prisma/generated/nestjs-dto/update-dictOkopf.dto';

@Injectable()
export class OkopfService extends PrismaCrudService<OkopfDto> {
  constructor(prisma: PrismaService) {
    super(prisma, OkopfDto);
  }
}
