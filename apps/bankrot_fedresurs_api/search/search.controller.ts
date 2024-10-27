import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchMessagesListService } from './search.messages-list-service';
import { SearchMessagesListDto } from './dto/messages-list.dto';
import { SearchDeptorsIndivListDto } from './dto/deptors-indiv-list.dto';
import { SearchDeptorsLegalListService } from './search.deptors-legal-list-service';
import { SearchDeptorsIndivListService } from './search.deptors-indiv-list-service';
import { SearchDeptorsLegalListDto } from './dto/deptors-legal-list.dto';

@ApiTags('_Search ᵃˡˡ ᵐᵉᵗʰᵒᵈˢ ʷ/ᵒ ᵃᵘᵗʰ⁻ᵗᵒᵏᵉⁿ')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchMessagesListService: SearchMessagesListService,
    private readonly searchDeptorsIndivListService: SearchDeptorsIndivListService,
    private readonly searchDeptorsLegalListService: SearchDeptorsLegalListService
  ) {}

  @ApiOperation({ summary: 'Search in messages list with nested docs' })
  @Post('messages-list')
  searchMessagesListDocs(@Body() searchMessagesListDto: SearchMessagesListDto) {
    return this.searchMessagesListService.searchMessagesListDocs(
      searchMessagesListDto
    );
  }

  @ApiOperation({ summary: 'Search in individual deptors list with nested docs' })
  @Post('deptors-indiv-list')
  searchDeptorsIndivListDocs(
    @Body() searchDeptorsIndivListDto: SearchDeptorsIndivListDto
  ) {
    return this.searchDeptorsIndivListService.searchDeptorsIndivListDocs(
      searchDeptorsIndivListDto
    );
  }

  @ApiOperation({ summary: 'Search in legal deptors list with nested docs' })
  @Post('deptors-legal-list')
  searchDeptorsLegalListDocs(
    @Body() searchDeptorsLegalListDto: SearchDeptorsLegalListDto
  ) {
    return this.searchDeptorsLegalListService.searchDeptorsLegalListDocs(
      searchDeptorsLegalListDto
    );
  }
}
