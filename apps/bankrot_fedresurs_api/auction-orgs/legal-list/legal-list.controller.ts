import { Controller, UseGuards } from '@nestjs/common';
import { PrismaCrud } from '../../crud/nestjsx-crud-prisma-adapter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuctionOrgsLegalListService } from './legal-list.service';
import {
  AuctionOrgsLegalList,
  CreateAuctionOrgsLegalListDto,
  UpdateAuctionOrgsLegalListDto
} from './dto';
import { CrudAuth } from '../../crud/nestjsx-crud-fork/crud/src';
import { crudAuthOptionsForAuctionOrgsLegalList } from './permissions';
import { OptionalJwtAuthGuard } from '../../auth/guards';

@PrismaCrud({
  model: {
    type: AuctionOrgsLegalList
  },
  dto: {
    create: CreateAuctionOrgsLegalListDto,
    update: UpdateAuctionOrgsLegalListDto,
    replace: CreateAuctionOrgsLegalListDto
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
@CrudAuth(crudAuthOptionsForAuctionOrgsLegalList)
@ApiTags('Auction organizators: legals list')
@Controller('auction-orgs-legals-list')
export class AuctionOrgsLegalListController {
  constructor(public service: AuctionOrgsLegalListService) {}
}
