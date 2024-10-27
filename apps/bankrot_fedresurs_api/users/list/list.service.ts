import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateUsersListDto as UsersListDto } from '../../prisma/generated/nestjs-dto/update-usersList.dto';

@Injectable()
export class UsersListService extends PrismaCrudService<UsersListDto> {
  constructor(prisma: PrismaService) {
    super(prisma, UsersListDto);
  }
}
