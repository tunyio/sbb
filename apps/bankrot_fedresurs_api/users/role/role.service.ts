import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateUsersRolesDto as UsersRoleDto } from '../../prisma/generated/nestjs-dto/update-usersRoles.dto';

@Injectable()
export class UsersRoleService extends PrismaCrudService<UsersRoleDto> {
  constructor(prisma: PrismaService) {
    super(prisma, UsersRoleDto);
  }
}
