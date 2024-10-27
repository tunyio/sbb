import { Injectable } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import {
  SEARCH_INDEX_JOBS_NAMES,
  SEARCH_INDEX_JOBS_QUEUE
} from '../../common/queue.constants';
import {
  getDelFromIndexDeptorsIndivListDocJobId,
  getDelFromIndexDeptorsLegalListDocJobId,
  getDelFromIndexMessagesListDocJobId,
  getIndexDeptorsIndivListDocJobId,
  getIndexDeptorsLegalListDocJobId,
  getIndexMessagesListDocJobId
} from '../../common/identical-job-id.utils';

const identicalJobsCommonOpts: JobsOptions = {
  delay: 5000,
  removeOnComplete: true,
  removeOnFail: true
};

@Injectable()
export class QueueApiSearchService {
  constructor(
    @InjectQueue(SEARCH_INDEX_JOBS_QUEUE) private searchIndexQueue: Queue
  ) {}

  async addJobForIndexMessagesListDoc(docPgId: number) {
    return this.searchIndexQueue.add(
      SEARCH_INDEX_JOBS_NAMES.INDEX_MESSAGES_LIST_DOC,
      {},
      {
        jobId: getIndexMessagesListDocJobId(docPgId),
        ...identicalJobsCommonOpts
      }
    );
  }

  async addJobForRemoveMessagesListDoc(docPgId: number) {
    return this.searchIndexQueue.add(
      SEARCH_INDEX_JOBS_NAMES.REMOVE_MESSAGES_LIST_DOC,
      {},
      {
        jobId: getDelFromIndexMessagesListDocJobId(docPgId),
        ...identicalJobsCommonOpts
      }
    );
  }

  async addJobForIndexDeptorsIndivListDoc(docPgId: number) {
    return this.searchIndexQueue.add(
      SEARCH_INDEX_JOBS_NAMES.INDEX_DEPTORS_INDIV_LIST_DOC,
      {},
      {
        jobId: getIndexDeptorsIndivListDocJobId(docPgId),
        ...identicalJobsCommonOpts
      }
    );
  }

  async addJobForRemoveDeptorsIndivListDoc(docPgId: number) {
    return this.searchIndexQueue.add(
      SEARCH_INDEX_JOBS_NAMES.REMOVE_DEPTORS_INDIV_LIST_DOC,
      {},
      {
        jobId: getDelFromIndexDeptorsIndivListDocJobId(docPgId),
        ...identicalJobsCommonOpts
      }
    );
  }

  async addJobForIndexDeptorsLegalListDoc(docPgId: number) {
    return this.searchIndexQueue.add(
      SEARCH_INDEX_JOBS_NAMES.INDEX_DEPTORS_LEGAL_LIST_DOC,
      {},
      {
        jobId: getIndexDeptorsLegalListDocJobId(docPgId),
        ...identicalJobsCommonOpts
      }
    );
  }

  async addJobForRemoveDeptorsLegalListDoc(docPgId: number) {
    return this.searchIndexQueue.add(
      SEARCH_INDEX_JOBS_NAMES.REMOVE_DEPTORS_LEGAL_LIST_DOC,
      {},
      {
        jobId: getDelFromIndexDeptorsLegalListDocJobId(docPgId),
        ...identicalJobsCommonOpts
      }
    );
  }
}
