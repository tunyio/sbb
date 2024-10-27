import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagesPublisherListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessagesListPgIdsForSearchJobs(
    messagesPublisherListPgId: number
  ): Promise<number[] | undefined> {
    const messagesPublisherListItem =
      await this.prismaService.messagesPublisherList.findFirstOrThrow({
        where: { id: messagesPublisherListPgId, deleted_at: {} },
        include: {
          MessagesList: {
            // where: { deleted_at: {} },
            select: { id: true }
          }
        }
      });

    return messagesPublisherListItem?.MessagesList?.map(
      (messagesListItem) => messagesListItem.id
    );
  }
}
