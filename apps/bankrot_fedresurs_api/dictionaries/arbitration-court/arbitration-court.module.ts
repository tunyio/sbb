import { Module } from '@nestjs/common';
import { ArbitrationCourtController } from './arbitration-court.controller';
import { ArbitrationCourtService } from './arbitration-court.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArbitrationCourtController],
  providers: [ArbitrationCourtService]
})
export class ArbitrationCourtModule {}
