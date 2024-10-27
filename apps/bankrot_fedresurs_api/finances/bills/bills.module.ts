import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { FinancesBillsService } from './bills.service';
import { FinancesBillsController } from './bills.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FinancesBillsController],
  providers: [FinancesBillsService]
})
export class FinancesBillsModule {}
