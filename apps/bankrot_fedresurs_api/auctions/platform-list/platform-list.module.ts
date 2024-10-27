import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuctionsPlatformListController } from './platform-list.controller';
import { AuctionsPlatformListService } from './platform-list.service';
import { QueueApiModule } from '../../queue/api/queue-api.module';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [AuctionsPlatformListController],
  providers: [AuctionsPlatformListService]
})
export class AuctionsPlatformListModule {}
