import { Module } from '@nestjs/common';
import { commonQueueModuleImports } from '../common/queue-module-imports';
import { QueueApiSearchService } from './services/queue-search.service';
import { FastifyAdapter } from '@bull-board/fastify';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { SEARCH_INDEX_JOBS_QUEUE } from '../common/queue.constants';

@Module({
  imports: [
    ...commonQueueModuleImports,
    BullBoardModule.forRoot({
      route: '/bull-board',
      adapter: FastifyAdapter
    }),
    BullBoardModule.forFeature({
      name: SEARCH_INDEX_JOBS_QUEUE,
      adapter: BullMQAdapter
    })
  ],
  providers: [QueueApiSearchService],
  exports: [QueueApiSearchService]
})
export class QueueApiModule {}
