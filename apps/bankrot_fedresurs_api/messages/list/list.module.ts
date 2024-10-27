import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MessagesListService } from './list.service';
import { MessagesListController } from './list.controller';
import { MessagesListDbService } from './list.db-service';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { MessagesListFileController } from './file.controller';
import { FileModule } from '../../file/file.module';

@Module({
  imports: [PrismaModule, QueueApiModule, FileModule],
  controllers: [MessagesListController, MessagesListFileController],
  providers: [MessagesListService, MessagesListDbService],
  exports: [MessagesListDbService]
})
export class MessagesListModule {}
