import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateMessagesListDto as MessagesListEntity } from '../../prisma/generated/nestjs-dto/update-messagesList.dto';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';

@Injectable()
export class MessagesListService extends PrismaCrudService<MessagesListEntity> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService
  ) {
    super(prisma, MessagesListEntity);
  }

  async addSearchIndexJobsForMessagesList(messagesListPgId: number) {
    await this.queueApiSearchService.addJobForIndexMessagesListDoc(
      messagesListPgId
    );
  }

  async addSrchIndexJobForDelMessagesList(messagesListPgId: number) {
    await this.queueApiSearchService.addJobForRemoveMessagesListDoc(
      messagesListPgId
    );
  }

  async createOne(
    req: CrudRequest,
    dto: MessagesListEntity
  ): Promise<MessagesListEntity> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<MessagesListEntity>
  ): Promise<MessagesListEntity[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) =>
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id)
    );

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: MessagesListEntity
  ): Promise<MessagesListEntity> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: MessagesListEntity
  ): Promise<MessagesListEntity> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | MessagesListEntity> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSrchIndexJobForDelMessagesList(deleted.id);

    return deleted;
  }
}
