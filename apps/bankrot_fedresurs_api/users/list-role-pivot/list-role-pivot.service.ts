import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateUsersRolesPivotDto as UsersListRolePivotDto } from '../../prisma/generated/nestjs-dto/update-usersRolesPivot.dto';

@Injectable()
export class UsersListRolePivotService extends PrismaCrudService<UsersListRolePivotDto> {
  constructor(prisma: PrismaService) {
    super(prisma, UsersListRolePivotDto);
  }
}
