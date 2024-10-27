import { Module } from '@nestjs/common';
import { commonQueueModuleImports } from '../common/queue-module-imports';
import { QueueBgJobsSearchService } from './services/queue-search.service';
import { QueueSearchProcessor } from './processors/queue-search.processor';
import { SearchModule } from '../../search/search.module';
import { MessagesListModule } from '../../messages/list';
import { DeptorsIndivListModule } from '../../deptors/indiv-list';
import { DeptorsLegalListModule } from '../../deptors/legal-list';

@Module({
  imports: [
    ...commonQueueModuleImports,
    SearchModule,
    MessagesListModule,
    DeptorsIndivListModule,
    DeptorsLegalListModule
  ],
  providers: [QueueSearchProcessor, QueueBgJobsSearchService]
})
export class QueueBgJobsModule {}
