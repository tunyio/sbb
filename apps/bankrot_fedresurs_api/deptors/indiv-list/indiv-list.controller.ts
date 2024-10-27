import { Controller, UseGuards } from '@nestjs/common';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeptorsIndivListService } from './indiv-list.service';
import {
  CreateDeptorsIndivListDto,
  DeptorsIndivList,
  UpdateDeptorsIndivListDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForDeptorsIndivList } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: DeptorsIndivList
  },
  dto: {
    create: CreateDeptorsIndivListDto,
    update: UpdateDeptorsIndivListDto,
    replace: CreateDeptorsIndivListDto
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
@CrudAuth(crudAuthOptionsForDeptorsIndivList)
@ApiTags('Deptors: individuals list')
@Controller('deptors-indiv-list')
export class DeptorsIndivListController {
  constructor(public service: DeptorsIndivListService) {}
}
