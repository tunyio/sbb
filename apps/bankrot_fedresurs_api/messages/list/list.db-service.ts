import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MessagesListSearchDoc } from '../../common/typing/based-on-prisma-models';

@Injectable()
export class MessagesListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  getMessagesListSearchDocByPgId(id: number): Promise<MessagesListSearchDoc> {
    return this.prismaService.messagesList.findFirstOrThrow({
      where: { id, deleted_at: {} },
      include: {
        MessagesPublisherList: {
          include: {
            DictSro: true,
            ArbManagersList: {
              include: {
                DictSro: true
              }
            },
            AuctionOrgsIndivList: true,
            AuctionOrgsLegalList: true
          }
        },
        DeptorsLegalList: true,
        DeptorsIndivList: true
      }
    });
  }
}
