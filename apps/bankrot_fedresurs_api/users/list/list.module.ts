import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersListService } from './list.service';
import { UsersListController } from './list.controller';
import { UsersListDbService } from './list.db-service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersListController],
  providers: [UsersListService, UsersListDbService],
  exports: [UsersListService, UsersListDbService]
})
export class UsersListModule {}
