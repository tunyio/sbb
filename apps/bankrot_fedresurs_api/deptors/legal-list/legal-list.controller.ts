import { Controller, UseGuards } from '@nestjs/common';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeptorsLegalListService } from './legal-list.service';
import {
  CreateDeptorsLegalListDto,
  DeptorsLegalList,
  UpdateDeptorsLegalListDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForDeptorsLegalList } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: DeptorsLegalList
  },
  dto: {
    create: CreateDeptorsLegalListDto,
    update: UpdateDeptorsLegalListDto,
    replace: CreateDeptorsLegalListDto
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
@CrudAuth(crudAuthOptionsForDeptorsLegalList)
@ApiTags('Deptors: legals list')
@Controller('deptors-legal-list')
export class DeptorsLegalListController {
  constructor(public service: DeptorsLegalListService) {}
}
