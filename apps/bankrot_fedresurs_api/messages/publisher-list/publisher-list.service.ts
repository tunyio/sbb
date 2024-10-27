import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateMessagesPublisherListDto as MessagesPublisherListDto } from '../../prisma/generated/nestjs-dto/update-messagesPublisherList.dto';
import { MessagesPublisherListDbService } from './publisher-list.db-service';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';

@Injectable()
export class MessagesPublisherListService extends PrismaCrudService<MessagesPublisherListDto> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly messagesPubListDbService: MessagesPublisherListDbService
  ) {
    super(prisma, MessagesPublisherListDto);
  }

  async addSearchIndexJobsForMessagesList(messagesPublisherListPgId: number) {
    const messagesListPgIds =
      await this.messagesPubListDbService.getMessagesListPgIdsForSearchJobs(
        messagesPublisherListPgId
      );

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(
    req: CrudRequest,
    dto: MessagesPublisherListDto
  ): Promise<MessagesPublisherListDto> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<MessagesPublisherListDto>
  ): Promise<MessagesPublisherListDto[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) =>
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id)
    );

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: MessagesPublisherListDto
  ): Promise<MessagesPublisherListDto> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: MessagesPublisherListDto
  ): Promise<MessagesPublisherListDto> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | MessagesPublisherListDto> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
