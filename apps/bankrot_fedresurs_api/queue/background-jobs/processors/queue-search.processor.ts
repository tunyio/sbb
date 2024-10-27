import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import {
  SEARCH_INDEX_JOBS_NAMES,
  SEARCH_INDEX_JOBS_QUEUE
} from '../../common/queue.constants';
import { QueueBgJobsSearchService } from '../services/queue-search.service';
import {
  getDelFromIndexDeptorsIndivListDocPgId,
  getDelFromIndexDeptorsLegalListDocPgId,
  getDelFromIndexMessagesListDocPgId,
  getIndexDeptorsIndivListDocPgId,
  getIndexDeptorsLegalListDocPgId,
  getIndexMessagesListDocPgId
} from '../../common/identical-job-id.utils';

@Processor(SEARCH_INDEX_JOBS_QUEUE)
export class QueueSearchProcessor extends WorkerHost {
  constructor(private readonly queueSearchService: QueueBgJobsSearchService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case SEARCH_INDEX_JOBS_NAMES.INDEX_MESSAGES_LIST_DOC:
        return this.queueSearchService.indexMessagesListDoc(
          getIndexMessagesListDocPgId(job.id)
        );
      case SEARCH_INDEX_JOBS_NAMES.REMOVE_MESSAGES_LIST_DOC:
        return this.queueSearchService.removeMessagesListDoc(
          getDelFromIndexMessagesListDocPgId(job.id)
        );
      case SEARCH_INDEX_JOBS_NAMES.INDEX_DEPTORS_INDIV_LIST_DOC:
        return this.queueSearchService.indexDeptorsIndivListDoc(
          getIndexDeptorsIndivListDocPgId(job.id)
        );
      case SEARCH_INDEX_JOBS_NAMES.REMOVE_DEPTORS_INDIV_LIST_DOC:
        return this.queueSearchService.removeDeptorsIndivListDoc(
          getDelFromIndexDeptorsIndivListDocPgId(job.id)
        );
      case SEARCH_INDEX_JOBS_NAMES.INDEX_DEPTORS_LEGAL_LIST_DOC:
        return this.queueSearchService.indexDeptorsLegalListDoc(
          getIndexDeptorsLegalListDocPgId(job.id)
        );
      case SEARCH_INDEX_JOBS_NAMES.REMOVE_DEPTORS_LEGAL_LIST_DOC:
        return this.queueSearchService.removeDeptorsLegalListDoc(
          getDelFromIndexDeptorsLegalListDocPgId(job.id)
        );
    }
  }
}
