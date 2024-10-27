import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateAuctionOrgsLegalListDto as AuctionOrgsLegalListDto } from '../../prisma/generated/nestjs-dto/update-auctionOrgsLegalList.dto';
import { AuctionOrgsLegalListDbService } from './legal-list.db-service';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';

@Injectable()
export class AuctionOrgsLegalListService extends PrismaCrudService<AuctionOrgsLegalListDto> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly auctOrgsLegalListDbService: AuctionOrgsLegalListDbService
  ) {
    super(prisma, AuctionOrgsLegalListDto);
  }

  async addSearchIndexJobsForMessagesList(auctOrgsLegalListPgId: number) {
    const messagesListPgIds =
      await this.auctOrgsLegalListDbService.getMessagesListPgIdsForSearchJobs(
        auctOrgsLegalListPgId
      );

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(
    req: CrudRequest,
    dto: AuctionOrgsLegalListDto
  ): Promise<AuctionOrgsLegalListDto> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<AuctionOrgsLegalListDto>
  ): Promise<AuctionOrgsLegalListDto[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) =>
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id)
    );

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: AuctionOrgsLegalListDto
  ): Promise<AuctionOrgsLegalListDto> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: AuctionOrgsLegalListDto
  ): Promise<AuctionOrgsLegalListDto> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | AuctionOrgsLegalListDto> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
