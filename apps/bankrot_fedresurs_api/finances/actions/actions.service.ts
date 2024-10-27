import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateFinancesActionsDto as FinancesActionsEntity } from '../../prisma/generated/nestjs-dto/update-financesActions.dto';

@Injectable()
export class FinancesActionsService extends PrismaCrudService<FinancesActionsEntity> {
  constructor(prisma: PrismaService) {
    super(prisma, FinancesActionsEntity);
  }
}
