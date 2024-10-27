import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateFinancesBillsDto as FinancesBillsEntity } from '../../prisma/generated/nestjs-dto/update-financesBills.dto';

@Injectable()
export class FinancesBillsService extends PrismaCrudService<FinancesBillsEntity> {
  constructor(prisma: PrismaService) {
    super(prisma, FinancesBillsEntity);
  }
}
