import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { SEARCH_INDEX_JOBS_QUEUE } from '../../common/queue.constants';
import { MessagesListDbService } from '../../../messages/list/list.db-service';
import { SearchMessagesListService } from '../../../search';
import { DeptorsIndivListDbService } from '../../../deptors/indiv-list/indiv-list.db-service';
import { DeptorsLegalListDbService } from '../../../deptors/legal-list/legal-list.db-service';
import { SearchDeptorsLegalListService } from '../../../search';
import { SearchDeptorsIndivListService } from '../../../search';

@Injectable()
export class QueueBgJobsSearchService {
  constructor(
    @InjectQueue(SEARCH_INDEX_JOBS_QUEUE) private searchIndexJobsQueue: Queue,
    private readonly messagesListDbService: MessagesListDbService,
    private readonly deptorsIndivListDbService: DeptorsIndivListDbService,
    private readonly deptorsLegalListDbService: DeptorsLegalListDbService,
    private readonly searchMessagesListService: SearchMessagesListService,
    private readonly searchDeptorsIndivListService: SearchDeptorsIndivListService,
    private readonly searchDeptorsLegalListService: SearchDeptorsLegalListService
  ) {}

  async indexMessagesListDoc(docPgId: number) {
    const doc =
      await this.messagesListDbService.getMessagesListSearchDocByPgId(docPgId);

    return this.searchMessagesListService.indexMessagesListDoc(doc);
  }

  async removeMessagesListDoc(docPgId: number) {
    return this.searchMessagesListService.removeMessagesListDoc(docPgId);
  }

  async indexDeptorsIndivListDoc(docPgId: number) {
    const doc =
      await this.deptorsIndivListDbService.getDeptorsIndivListSearchDocByPgId(
        docPgId
      );

    return this.searchDeptorsIndivListService.indexDeptorsIndivListDoc(doc);
  }

  async removeDeptorsIndivListDoc(docPgId: number) {
    return this.searchDeptorsIndivListService.removeDeptorsIndivListDoc(docPgId);
  }

  async indexDeptorsLegalListDoc(docPgId: number) {
    const doc =
      await this.deptorsLegalListDbService.getDeptorsLegalListSearchDocByPgId(
        docPgId
      );

    return this.searchDeptorsLegalListService.indexDeptorsLegalListDoc(doc);
  }

  async removeDeptorsLegalListDoc(docPgId: number) {
    return this.searchDeptorsLegalListService.removeDeptorsLegalListDoc(docPgId);
  }
}
