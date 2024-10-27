import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuctionOrgsIndivListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessagesListPgIdsForSearchJobs(
    auctOrgsIndivListPgId: number
  ): Promise<number[] | undefined> {
    const auctOrgsIndivListItem =
      await this.prismaService.auctionOrgsIndivList.findFirstOrThrow({
        where: { id: auctOrgsIndivListPgId, deleted_at: {} },
        include: {
          MessagesPublisherList: {
            // where: { deleted_at: {} },
            include: {
              MessagesList: {
                // where: { deleted_at: {} },
                select: { id: true }
              }
            }
          }
        }
      });

    return auctOrgsIndivListItem?.MessagesPublisherList?.flatMap(
      (mesPubListItem) =>
        mesPubListItem?.MessagesList?.map(
          (messagesListItem) => messagesListItem.id
        )
    );
  }
}
