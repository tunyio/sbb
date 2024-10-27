import { Controller, UseGuards } from '@nestjs/common';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuctionsPlatformListService } from './platform-list.service';
import {
  CreateAuctionsPlatformListDto,
  AuctionsPlatformList,
  UpdateAuctionsPlatformListDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForAuctionsPlatformList } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: AuctionsPlatformList
  },
  dto: {
    create: CreateAuctionsPlatformListDto,
    update: UpdateAuctionsPlatformListDto,
    replace: CreateAuctionsPlatformListDto
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
@CrudAuth(crudAuthOptionsForAuctionsPlatformList)
@ApiTags('Auctions: list of platforms')
@Controller('auctions-platform-list')
export class AuctionsPlatformListController {
  constructor(public service: AuctionsPlatformListService) {}
}
