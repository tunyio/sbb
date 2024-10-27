import { Controller, UseGuards } from '@nestjs/common';
import { ArbitrationCourtService } from './arbitration-court.service';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  DictArbitrationCourts,
  CreateDictArbitrationCourtsDto,
  UpdateDictArbitrationCourtsDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForDictArbitrationCourt } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: DictArbitrationCourts
  },
  dto: {
    create: CreateDictArbitrationCourtsDto,
    update: UpdateDictArbitrationCourtsDto,
    replace: CreateDictArbitrationCourtsDto
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
@CrudAuth(crudAuthOptionsForDictArbitrationCourt)
@ApiTags('Dictionary: arbitration court ᴳᴱᵀ ʷ/ᵒ ᵃᵘᵗʰ⁻ᵗᵒᵏᵉⁿ')
@Controller('arbitration-court')
export class ArbitrationCourtController {
  constructor(public service: ArbitrationCourtService) {}
}
