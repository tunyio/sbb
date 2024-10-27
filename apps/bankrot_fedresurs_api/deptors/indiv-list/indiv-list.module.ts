import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DeptorsIndivListController } from './indiv-list.controller';
import { DeptorsIndivListService } from './indiv-list.service';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { DeptorsIndivListDbService } from './indiv-list.db-service';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [DeptorsIndivListController],
  providers: [DeptorsIndivListService, DeptorsIndivListDbService],
  exports: [DeptorsIndivListDbService]
})
export class DeptorsIndivListModule {}
