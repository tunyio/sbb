import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuctionOrgsLegalListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessagesListPgIdsForSearchJobs(
    auctOrgsLegalListPgId: number
  ): Promise<number[] | undefined> {
    const auctOrgsLegalListItem =
      await this.prismaService.auctionOrgsLegalList.findFirstOrThrow({
        where: { id: auctOrgsLegalListPgId, deleted_at: {} },
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

    return auctOrgsLegalListItem?.MessagesPublisherList?.flatMap(
      (mesPubListItem) =>
        mesPubListItem?.MessagesList?.map(
          (messagesListItem) => messagesListItem.id
        )
    );
  }
}
