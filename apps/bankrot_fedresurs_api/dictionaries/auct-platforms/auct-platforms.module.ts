import { Module } from '@nestjs/common';
import { AuctPlatformsController } from './auct-platforms.controller';
import { AuctPlatformsService } from './auct-platforms.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AuctPlatformsController],
  providers: [AuctPlatformsService]
})
export class AuctPlatformsModule {}
