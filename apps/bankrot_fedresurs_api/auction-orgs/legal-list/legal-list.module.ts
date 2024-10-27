import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuctionOrgsLegalListController } from './legal-list.controller';
import { AuctionOrgsLegalListService } from './legal-list.service';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { AuctionOrgsLegalListDbService } from './legal-list.db-service';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [AuctionOrgsLegalListController],
  providers: [AuctionOrgsLegalListService, AuctionOrgsLegalListDbService]
})
export class AuctionOrgsLegalListModule {}
