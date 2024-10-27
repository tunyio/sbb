import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateArbManagersListDto as ArbManagersListDto } from '../../prisma/generated/nestjs-dto/update-arbManagersList.dto';
import { ArbManagersListDbService } from './list.db-service';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';

@Injectable()
export class ArbManagersListService extends PrismaCrudService<ArbManagersListDto> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly arbManagersListDbService: ArbManagersListDbService
  ) {
    super(prisma, ArbManagersListDto);
  }

  async addSearchIndexJobsForMessagesList(arbManagersListPgId: number) {
    const messagesListPgIds =
      await this.arbManagersListDbService.getMessagesListPgIdsForSearchJobs(
        arbManagersListPgId
      );

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(
    req: CrudRequest,
    dto: ArbManagersListDto
  ): Promise<ArbManagersListDto> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<ArbManagersListDto>
  ): Promise<ArbManagersListDto[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) =>
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id)
    );

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: ArbManagersListDto
  ): Promise<ArbManagersListDto> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: ArbManagersListDto
  ): Promise<ArbManagersListDto> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | ArbManagersListDto> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
