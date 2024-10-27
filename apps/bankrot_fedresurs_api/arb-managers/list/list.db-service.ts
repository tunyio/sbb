import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArbManagersListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessagesListPgIdsForSearchJobs(
    arbManagersListPgId: number
  ): Promise<number[] | undefined> {
    const arbManagersListItem =
      await this.prismaService.arbManagersList.findFirstOrThrow({
        where: { id: arbManagersListPgId, deleted_at: {} },
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

    return arbManagersListItem?.MessagesPublisherList?.flatMap((mesPubListItem) =>
      mesPubListItem?.MessagesList?.map((messagesListItem) => messagesListItem.id)
    );
  }
}
