import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FastifyRequest as Request } from 'fastify';
import { PassportSerializer } from '../fastify-passport';
import { UsersListDbService } from '../users/list';
import { AdminsListDbService } from '../admins/list/list.db-service';
import { PassportUser } from '../common/typing/based-on-prisma-models';

interface AuthSerializerPayload {
  id: number;
  isAdmin: boolean;
}

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(
    private readonly adminsListDbService: AdminsListDbService,
    @Inject(forwardRef(() => UsersListDbService))
    private readonly usersListDbService: UsersListDbService
  ) {
    super();
  }

  serializeUser = (
    user: PassportUser,
    request: Request
  ): AuthSerializerPayload => ({
    id: !!user.isAdmin ? +user.data_for_admin.id : +user.data_not_admin.id,
    isAdmin: !!user.isAdmin
  });

  async deserializeUser(payload: AuthSerializerPayload, request: Request) {
    if (payload.isAdmin) {
      return this.adminsListDbService.getPassportUserById(payload.id);
    } else {
      return this.usersListDbService.getPassportUserById(payload.id);
    }
  }
}
