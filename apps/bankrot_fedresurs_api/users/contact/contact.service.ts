import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateUsersContactsDto as UsersContactsDto } from '../../prisma/generated/nestjs-dto/update-usersContacts.dto';

@Injectable()
export class UsersContactsService extends PrismaCrudService<UsersContactsDto> {
  constructor(prisma: PrismaService) {
    super(prisma, UsersContactsDto);
  }
}
