import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersRoleService } from './role.service';
import { UsersRoleController } from './role.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersRoleController],
  providers: [UsersRoleService]
})
export class UsersRoleModule {}
