import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDeptorsIndivListDto as DeptorsIndivListEntity } from '../../prisma/generated/nestjs-dto/update-deptorsIndivList.dto';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';
import { DeptorsIndivListDbService } from './indiv-list.db-service';

@Injectable()
export class DeptorsIndivListService extends PrismaCrudService<DeptorsIndivListEntity> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly deptorsIndivListDbService: DeptorsIndivListDbService
  ) {
    super(prisma, DeptorsIndivListEntity);
  }

  async addSearchIndexJobsForDeptorsIndivList(deptIndivListPgId: number) {
    await this.queueApiSearchService.addJobForIndexDeptorsIndivListDoc(
      deptIndivListPgId
    );
  }

  async addSrchIndexJobForDelDeptorsIndivList(deptIndivListPgId: number) {
    await this.queueApiSearchService.addJobForRemoveDeptorsIndivListDoc(
      deptIndivListPgId
    );
  }

  async addSearchIndexJobsForMessagesList(deptorsIndivListPgId: number) {
    const messagesListPgIds =
      await this.deptorsIndivListDbService.getMessagesListPgIdsForSearchJobs(
        deptorsIndivListPgId
      );

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(
    req: CrudRequest,
    dto: DeptorsIndivListEntity
  ): Promise<DeptorsIndivListEntity> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForDeptorsIndivList(created.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<DeptorsIndivListEntity>
  ): Promise<DeptorsIndivListEntity[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) => {
      // @ts-ignore
      this.addSearchIndexJobsForDeptorsIndivList(created.id);
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id);
    });

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: DeptorsIndivListEntity
  ): Promise<DeptorsIndivListEntity> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForDeptorsIndivList(updated.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: DeptorsIndivListEntity
  ): Promise<DeptorsIndivListEntity> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForDeptorsIndivList(newReplaced.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | DeptorsIndivListEntity> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSrchIndexJobForDelDeptorsIndivList(deleted.id);
    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
