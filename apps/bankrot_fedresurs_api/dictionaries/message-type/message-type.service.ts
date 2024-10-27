import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaCrudService } from '../../crud/nestjsx-crud-prisma-adapter';
import { UpdateDictMessageTypesDto as MessageTypeDto } from '../../prisma/generated/nestjs-dto/update-dictMessageTypes.dto';

@Injectable()
export class MessageTypeService extends PrismaCrudService<MessageTypeDto> {
  constructor(prisma: PrismaService) {
    super(prisma, MessageTypeDto);
  }
}
