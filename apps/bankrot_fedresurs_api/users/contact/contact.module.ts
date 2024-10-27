import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersContactsService } from './contact.service';
import { UsersContactsController } from './contact.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersContactsController],
  providers: [UsersContactsService]
})
export class UsersContactsModule {}
