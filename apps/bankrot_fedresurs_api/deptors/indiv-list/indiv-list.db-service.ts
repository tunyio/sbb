import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeptorsIndivListSearchDoc } from '../../common/typing/based-on-prisma-models';

@Injectable()
export class DeptorsIndivListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  getDeptorsIndivListSearchDocByPgId(
    id: number
  ): Promise<DeptorsIndivListSearchDoc> {
    return this.prismaService.deptorsIndivList.findFirstOrThrow({
      where: { id, deleted_at: {} }
    });
  }

  async getMessagesListPgIdsForSearchJobs(
    deptorsIndivListPgId: number
  ): Promise<number[] | undefined> {
    const deptorsIndivListItem =
      await this.prismaService.deptorsIndivList.findFirstOrThrow({
        where: { id: deptorsIndivListPgId, deleted_at: {} },
        include: {
          MessagesList: {
            // where: { deleted_at: {} },
            select: { id: true }
          }
        }
      });

    return deptorsIndivListItem?.MessagesList?.map(
      (messagesListItem) => messagesListItem.id
    );
  }
}
