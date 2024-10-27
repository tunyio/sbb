import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeptorsLegalListSearchDoc } from '../../common/typing/based-on-prisma-models';

@Injectable()
export class DeptorsLegalListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  getDeptorsLegalListSearchDocByPgId(
    id: number
  ): Promise<DeptorsLegalListSearchDoc> {
    return this.prismaService.deptorsLegalList.findFirstOrThrow({
      where: { id, deleted_at: {} }
    });
  }

  async getMessagesListPgIdsForSearchJobs(
    deptorsLegalListPgId: number
  ): Promise<number[] | undefined> {
    const deptorsLegalListItem =
      await this.prismaService.deptorsLegalList.findFirstOrThrow({
        where: { id: deptorsLegalListPgId, deleted_at: {} },
        include: {
          MessagesList: {
            // where: { deleted_at: {} },
            select: { id: true }
          }
        }
      });

    return deptorsLegalListItem?.MessagesList?.map(
      (messagesListItem) => messagesListItem.id
    );
  }
}
