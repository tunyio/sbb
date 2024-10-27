import { Module } from '@nestjs/common';
import { ArbManagersActionsController } from './actions.controller';
import { ArbManagersActionsService } from './actions.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArbManagersActionsController],
  providers: [ArbManagersActionsService]
})
export class ArbManagersActionsModule {}
