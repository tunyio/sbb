import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateAuctionOrgsIndivListDto as AuctionOrgsIndivListDto } from '../../prisma/generated/nestjs-dto/update-auctionOrgsIndivList.dto';
import { AuctionOrgsIndivListDbService } from './indiv-list.db-service';
import { QueueApiSearchService } from '../../queue/api/services/queue-search.service';
import {
  CreateManyDto,
  CrudRequest
} from '../../crud/nestjsx-crud-fork/crud/src';

@Injectable()
export class AuctionOrgsIndivListService extends PrismaCrudService<AuctionOrgsIndivListDto> {
  constructor(
    prisma: PrismaService,
    private readonly queueApiSearchService: QueueApiSearchService,
    private readonly auctOrgsIndivListDbService: AuctionOrgsIndivListDbService
  ) {
    super(prisma, AuctionOrgsIndivListDto);
  }

  async addSearchIndexJobsForMessagesList(auctOrgsIndivListPgId: number) {
    const messagesListPgIds =
      await this.auctOrgsIndivListDbService.getMessagesListPgIdsForSearchJobs(
        auctOrgsIndivListPgId
      );

    messagesListPgIds?.map(
      async (pgId) =>
        await this.queueApiSearchService.addJobForIndexMessagesListDoc(pgId)
    );
  }

  async createOne(
    req: CrudRequest,
    dto: AuctionOrgsIndivListDto
  ): Promise<AuctionOrgsIndivListDto> {
    const created = await super.createOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(created.id);

    return created;
  }

  async createMany(
    req: CrudRequest,
    dto: CreateManyDto<AuctionOrgsIndivListDto>
  ): Promise<AuctionOrgsIndivListDto[]> {
    const arrCreated = await super.createMany(req, dto);

    arrCreated.map((created) =>
      // @ts-ignore
      this.addSearchIndexJobsForMessagesList(created.id)
    );

    return arrCreated;
  }

  async updateOne(
    req: CrudRequest,
    dto: AuctionOrgsIndivListDto
  ): Promise<AuctionOrgsIndivListDto> {
    const updated = await super.updateOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(updated.id);

    return updated;
  }

  async replaceOne(
    req: CrudRequest,
    dto: AuctionOrgsIndivListDto
  ): Promise<AuctionOrgsIndivListDto> {
    const newReplaced = await super.replaceOne(req, dto);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(newReplaced.id);

    return newReplaced;
  }

  async deleteOne(req: CrudRequest): Promise<void | AuctionOrgsIndivListDto> {
    const deleted = await super.deleteOne(req);

    // @ts-ignore
    this.addSearchIndexJobsForMessagesList(deleted.id);

    return deleted;
  }
}
