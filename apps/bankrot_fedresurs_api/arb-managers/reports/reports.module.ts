import { Module } from '@nestjs/common';
import { ArbManagersReportsController } from './reports.controller';
import { ArbManagersReportsService } from './reports.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArbManagersReportsController],
  providers: [ArbManagersReportsService]
})
export class ArbManagersReportsModule {}
