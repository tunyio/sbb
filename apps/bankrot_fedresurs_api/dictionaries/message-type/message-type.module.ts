import { Module } from '@nestjs/common';
import { MessageTypeController } from './message-type.controller';
import { MessageTypeService } from './message-type.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MessageTypeController],
  providers: [MessageTypeService]
})
export class MessageTypeModule {}
