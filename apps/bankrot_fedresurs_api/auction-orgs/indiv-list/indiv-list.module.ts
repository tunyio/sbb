import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuctionOrgsIndivListController } from './indiv-list.controller';
import { AuctionOrgsIndivListService } from './indiv-list.service';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { AuctionOrgsIndivListDbService } from './indiv-list.db-service';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [AuctionOrgsIndivListController],
  providers: [AuctionOrgsIndivListService, AuctionOrgsIndivListDbService]
})
export class AuctionOrgsIndivListModule {}
