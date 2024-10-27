import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MessagesPublisherListService } from './publisher-list.service';
import { MessagesPublisherListController } from './publisher-list.controller';
import { MessagesPublisherListDbService } from './publisher-list.db-service';
import { QueueApiModule } from '../../queue/api/queue-api.module';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [MessagesPublisherListController],
  providers: [MessagesPublisherListService, MessagesPublisherListDbService]
})
export class MessagesPublisherListModule {}
