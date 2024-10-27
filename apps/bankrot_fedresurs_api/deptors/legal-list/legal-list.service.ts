import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDeptorsLegalListDto as DeptorsLegalListEntity } from '../../prisma/generated/nestjs-dto/update-deptorsLegalList.dto';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';
import { DeptorsLegalListDbService } from './legal-list.db-service';

@Injectable()
export class DeptorsLegalListService extends PrismaCrudService<DeptorsLegalListEntity> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly deptorsLegalListDbService: DeptorsLegalListDbService
  ) {
    super(prisma, DeptorsLegalListEntity);
  }

  async addSearchIndexJobsForDeptorsLegalList(deptLegalListPgId: number) {
    await this.queueApiSearchService.addJobForIndexDeptorsLegalListDoc(
      deptLegalListPgId
    );
  }

  async addSrchIndexJobForDelDeptorsLegalListDoc(deptLegalListPgId: number) {
    await this.queueApiSearchService.addJobForRemoveDeptorsLegalListDoc(
      deptLegalListPgId
    );
  }

  async addSearchIndexJobsForMessagesList(deptorsLegalListPgId: number) {
    const messagesListPgIds =
      await this.deptorsLegalListDbService.getMessagesListPgIdsForSearchJobs(
        deptorsLegalListPgId
      );

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(
    req: CrudRequest,
    dto: DeptorsLegalListEntity
  ): Promise<DeptorsLegalListEntity> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForDeptorsLegalList(created.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<DeptorsLegalListEntity>
  ): Promise<DeptorsLegalListEntity[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) => {
      // @ts-ignore
      this.addSearchIndexJobsForDeptorsLegalList(created.id);
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id);
    });

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: DeptorsLegalListEntity
  ): Promise<DeptorsLegalListEntity> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForDeptorsLegalList(updated.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: DeptorsLegalListEntity
  ): Promise<DeptorsLegalListEntity> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForDeptorsLegalList(newReplaced.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | DeptorsLegalListEntity> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSrchIndexJobForDelDeptorsLegalListDoc(deleted.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
