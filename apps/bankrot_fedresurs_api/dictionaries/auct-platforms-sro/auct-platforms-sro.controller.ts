import { Controller, UseGuards } from '@nestjs/common';
import { AuctPlatformsSroService } from './auct-platforms-sro.service';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateDictAuctPlatformsSroDto,
  DictAuctPlatformsSro,
  UpdateDictAuctPlatformsSroDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForDictAuctPlatformsSro } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: DictAuctPlatformsSro
  },
  dto: {
    create: CreateDictAuctPlatformsSroDto,
    update: UpdateDictAuctPlatformsSroDto,
    replace: CreateDictAuctPlatformsSroDto
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
@CrudAuth(crudAuthOptionsForDictAuctPlatformsSro)
@ApiTags('Dictionary: sro of auction platforms ᴳᴱᵀ ʷ/ᵒ ᵃᵘᵗʰ⁻ᵗᵒᵏᵉⁿ')
@Controller('auct-platforms-sro')
export class AuctPlatformsSroController {
  constructor(public service: AuctPlatformsSroService) {}
}
