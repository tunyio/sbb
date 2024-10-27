import { Module } from '@nestjs/common';
import { AuctPlatformsSroController } from './auct-platforms-sro.controller';
import { AuctPlatformsSroService } from './auct-platforms-sro.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuctPlatformsSroController],
  providers: [AuctPlatformsSroService]
})
export class AuctPlatformsSroModule {}
