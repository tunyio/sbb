import { Controller, UseGuards } from '@nestjs/common';
import { ArbManagersListService } from './list.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ArbManagersList,
  CreateArbManagersListDto,
  UpdateArbManagersListDto
} from './dto';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForArbManagersList } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: ArbManagersList
  },
  dto: {
    create: CreateArbManagersListDto,
    update: UpdateArbManagersListDto,
    replace: CreateArbManagersListDto
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
@CrudAuth(crudAuthOptionsForArbManagersList)
@ApiTags('Arbitration managers: list')
@Controller('arb-managers-list')
export class ArbManagersListController {
  constructor(public service: ArbManagersListService) {}
}
