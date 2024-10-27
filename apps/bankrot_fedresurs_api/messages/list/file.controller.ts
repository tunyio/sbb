import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileControllerFactory } from '../../file/file-controller.factory';
import { OptionalJwtAuthGuard } from '../../auth/guards';
import { UpdateMessagesListDto as MessagesListEntity } from '../../prisma/generated/nestjs-dto/update-messagesList.dto';

const messagesListFileController = new FileControllerFactory({
  entity: MessagesListEntity,
  permissions: async (req, pgId, fieldName) => {
    // CASL checking by args
  },
  routes: {
    uploadByPgIdAndFieldName: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    }
  }
}).product;

@ApiTags('Messages: list (routes only for files functionality)')
@Controller('messages-list-file')
export class MessagesListFileController extends messagesListFileController {}
