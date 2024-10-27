import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DataNotAdmin,
  PassportUser
} from '../../common/typing/based-on-prisma-models';
import { isValidEmail } from '../../common/utils';

@Injectable()
export class UsersListDbService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPassportUserById(id: number): Promise<PassportUser> {
    const user = await this.prismaService.usersList.findFirstOrThrow({
      where: { id },
      include: this.getPassportUserPopulates()
    });

    return this.getPassportUserForNotAdmin(user);
  }

  async getPassportUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<PassportUser> {
    if (isValidEmail(loginOrEmail)) {
      const user = await this.prismaService.usersList.findFirst({
        where: { UsersContacts: { some: { email: loginOrEmail } } },
        include: this.getPassportUserPopulates()
      });

      return this.getPassportUserForNotAdmin(user);
    } else {
      const user = await this.prismaService.usersList.findFirst({
        where: { login: loginOrEmail },
        include: this.getPassportUserPopulates()
      });

      return this.getPassportUserForNotAdmin(user);
    }
  }

  async createUserWithEmail(
    user: { login: string; passw_hash: string },
    email: string
  ): Promise<PassportUser> {
    const newUserData = await this.prismaService.usersList.create({
      data: {
        ...user,
        UsersContacts: { create: { email } }
      },
      include: this.getPassportUserPopulates()
    });

    return this.getPassportUserForNotAdmin(newUserData);
  }

  private getPassportUserForNotAdmin(data: DataNotAdmin): PassportUser {
    return {
      isAdmin: false,
      data_for_admin: null,
      data_not_admin: data
    };
  }

  private getPassportUserPopulates = () => ({
    UsersContacts: true,
    UsersRolesPivot: {
      include: {
        UsersRoles: true
      }
    }
  });

  async savePassportUser(user: PassportUser) {
    const userData = user.data_not_admin;
    const newUserContacts = { ...userData?.UsersContacts?.[0] };
    delete newUserContacts.id;
    delete newUserContacts.user_id;

    return this.prismaService.usersList.update({
      where: { id: userData.id },
      data: {
        login: userData.login,
        passw_hash: userData.passw_hash,
        blocked: userData.blocked,
        blocked_reason: userData.blocked_reason,
        UsersContacts: {
          upsert: {
            where: { id: userData?.UsersContacts?.[0]?.id || -1 },
            create: newUserContacts,
            update: newUserContacts
          }
        }
      }
    });
  }
}
