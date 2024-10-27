import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuctionsListService } from './list.service';
import { AuctionsListController } from './list.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuctionsListController],
  providers: [AuctionsListService]
})
export class AuctionsListModule {}
