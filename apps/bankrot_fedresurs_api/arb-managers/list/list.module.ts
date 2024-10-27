import { Module } from '@nestjs/common';
import { ArbManagersListController } from './list.controller';
import { ArbManagersListService } from './list.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { ArbManagersListDbService } from './list.db-service';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [ArbManagersListController],
  providers: [ArbManagersListService, ArbManagersListDbService]
})
export class ArbManagersListModule {}
