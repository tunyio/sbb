import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DeptorsLegalListService } from './legal-list.service';
import { DeptorsLegalListController } from './legal-list.controller';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { DeptorsLegalListDbService } from './legal-list.db-service';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [DeptorsLegalListController],
  providers: [DeptorsLegalListService, DeptorsLegalListDbService],
  exports: [DeptorsLegalListDbService]
})
export class DeptorsLegalListModule {}
