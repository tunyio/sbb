import { Controller, UseGuards } from '@nestjs/common';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagesListService } from './list.service';
import {
  CreateMessagesListDto,
  MessagesList,
  UpdateMessagesListDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForMessagesList } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: MessagesList
  },
  dto: {
    create: CreateMessagesListDto,
    update: UpdateMessagesListDto,
    replace: CreateMessagesListDto
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  },
  query: {
    alwaysPaginate: true
  },
  routes: {
    getManyBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    },
    getOneBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    },
    createOneBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    },
    createManyBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    },
    updateOneBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    },
    replaceOneBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    },
    deleteOneBase: {
      decorators: [UseGuards(OptionalJwtAuthGuard), ApiBearerAuth('access-token')]
    }
  }
})
@CrudAuth(crudAuthOptionsForMessagesList)
@ApiTags('Messages: list')
@Controller('messages-list')
export class MessagesListController {
  constructor(public service: MessagesListService) {}
}