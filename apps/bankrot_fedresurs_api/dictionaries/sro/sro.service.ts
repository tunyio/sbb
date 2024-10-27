import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictSroDto as SroDto } from '../../prisma/generated/nestjs-dto/update-dictSro.dto';
import { SroDbService } from './sro.db-service';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';

@Injectable()
export class SroService extends PrismaCrudService<SroDto> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly sroDbService: SroDbService
  ) {
    super(prisma, SroDto);
  }

  async addSearchIndexJobsForMessagesList(sroPgId: number) {
    const messagesListPgIds =
      await this.sroDbService.getMessagesListPgIdsForSearchJobs(sroPgId);

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(req: CrudRequest, dto: SroDto): Promise<SroDto> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<SroDto>
  ): Promise<SroDto[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) =>
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id)
    );

    return arrCreated;
  }

  async updateOne(req: CrudRequest, dto: SroDto): Promise<SroDto> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(req: CrudRequest, dto: SroDto): Promise<SroDto> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | SroDto> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
