import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SroDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMessagesListPgIdsForSearchJobs(
    dictSroPgId: number
  ): Promise<number[]> {
    const dictSroItem = await this.prismaService.dictSro.findFirstOrThrow({
      where: { id: dictSroPgId, deleted_at: {} },
      include: {
        MessagesPublisherList: {
          // where: { deleted_at: {} },
          include: {
            MessagesList: {
              // where: { deleted_at: {} },
              select: { id: true }
            }
          }
        },
        ArbManagersList: {
          // where: { deleted_at: {} },
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
        }
      }
    });

    const messagesListIdsFromInclude_1 =
      dictSroItem?.MessagesPublisherList?.flatMap((mesPubListItem) =>
        mesPubListItem?.MessagesList?.map(
          (messagesListItem) => messagesListItem.id
        )
      );

    const messagesListIdsFromInclude_2 = dictSroItem?.ArbManagersList?.flatMap(
      (arbManListItem) =>
        arbManListItem?.MessagesPublisherList?.flatMap((mesPubListItem) =>
          mesPubListItem?.MessagesList?.map(
            (messagesListItem) => messagesListItem.id
          )
        )
    );

    return [...messagesListIdsFromInclude_1, ...messagesListIdsFromInclude_2];
  }
}
