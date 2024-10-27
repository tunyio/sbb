import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersListRolePivotService } from './list-role-pivot.service';
import { UsersListRolePivotController } from './list-role-pivot.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersListRolePivotController],
  providers: [UsersListRolePivotService]
})
export class UsersListRolePivotModule {}
