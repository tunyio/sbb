import { BullModule } from '@nestjs/bullmq';
import { SEARCH_INDEX_JOBS_QUEUE } from './queue.constants';

export const commonQueueModuleImports = [
  BullModule.forRoot({
    connection: {
      host: process.env?.REDIS_HOST || 'redis',
      port: Number(process.env?.REDIS_PORT) || 6379
    }
  }),
  BullModule.registerQueue({
    name: SEARCH_INDEX_JOBS_QUEUE
  })
];
