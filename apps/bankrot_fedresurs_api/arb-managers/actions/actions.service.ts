import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateArbManagersActionsDto as ArbManagersActionsDto } from '../../prisma/generated/nestjs-dto/update-arbManagersActions.dto';

@Injectable()
export class ArbManagersActionsService extends PrismaCrudService<ArbManagersActionsDto> {
  constructor(prisma: PrismaService) {
    super(prisma, ArbManagersActionsDto);
  }
}
