import { Module } from '@nestjs/common';
import { SroController } from './sro.controller';
import { SroService } from './sro.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { QueueApiModule } from '../../queue/api/queue-api.module';
import { SroDbService } from './sro.db-service';

@Module({
  imports: [PrismaModule, QueueApiModule],
  controllers: [SroController],
  providers: [SroService, SroDbService]
})
export class SroModule {}
