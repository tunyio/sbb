import { Controller, UseGuards } from '@nestjs/common';
import { ArbManagersReportsService } from './reports.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ArbManagersReports,
  CreateArbManagersReportsDto,
  UpdateArbManagersReportsDto
} from './dto';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForArbManagersReports } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: ArbManagersReports
  },
  dto: {
    create: CreateArbManagersReportsDto,
    update: UpdateArbManagersReportsDto,
    replace: CreateArbManagersReportsDto
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
@CrudAuth(crudAuthOptionsForArbManagersReports)
@ApiTags('Arbitration managers: reports')
@Controller('arb-managers-reports')
export class ArbManagersReportsController {
  constructor(public service: ArbManagersReportsService) {}
}
