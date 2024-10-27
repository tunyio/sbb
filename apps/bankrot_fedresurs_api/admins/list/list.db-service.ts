import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DataForAdmin,
  PassportUser
} from '../../common/typing/based-on-prisma-models';

@Injectable()
export class AdminsListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPassportUserById(id: number): Promise<PassportUser> {
    const user = await this.prismaService.adminsList.findFirstOrThrow({
      where: { id }
    });

    return this.getPassportUserForAdmin(user);
  }

  async getPassportUserByLogin(login: string): Promise<PassportUser> {
    const user = await this.prismaService.adminsList.findFirst({
      where: { login }
    });

    return this.getPassportUserForAdmin(user);
  }

  private getPassportUserForAdmin(data: DataForAdmin): PassportUser {
    return {
      isAdmin: true,
      data_for_admin: data,
      data_not_admin: null
    };
  }
}
