import { Controller, UseGuards } from '@nestjs/common';
import { ArbManagersActionsService } from './actions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ArbManagersActions,
  CreateArbManagersActionsDto,
  UpdateArbManagersActionsDto
} from './dto';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForArbManagersActions } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: ArbManagersActions
  },
  dto: {
    create: CreateArbManagersActionsDto,
    update: UpdateArbManagersActionsDto,
    replace: CreateArbManagersActionsDto
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
@CrudAuth(crudAuthOptionsForArbManagersActions)
@ApiTags('Arbitration managers: actions')
@Controller('arb-managers-actions')
export class ArbManagersActionsController {
  constructor(public service: ArbManagersActionsService) {}
}
