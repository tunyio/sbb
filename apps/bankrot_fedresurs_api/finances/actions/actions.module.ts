import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { FinancesActionsController } from './actions.controller';
import { FinancesActionsService } from './actions.service';
import { QueueApiModule } from '../../queue/api/queue-api.module';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [FinancesActionsController],
  providers: [FinancesActionsService]
})
export class FinancesActionsModule {}
