import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminsListDbService } from './list/list.db-service';

@Module({
  imports: [PrismaModule],
  providers: [AdminsListDbService],
  exports: [AdminsListDbService]
})
export class AdminsModule {}
