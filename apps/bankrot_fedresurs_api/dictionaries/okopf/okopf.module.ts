import { Module } from '@nestjs/common';
import { OkopfController } from './okopf.controller';
import { OkopfService } from './okopf.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OkopfController],
  providers: [OkopfService]
})
export class OkopfModule {}
