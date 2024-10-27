import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested, IsString, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SearchPaginationDto } from './search-pagination.dto';
import { message_publisher } from '@prisma/client';
import { SearchArbManagersListByFieldsDto } from './arb-managers-list.dto';
import { SearchDictSroByFieldsDto } from './dict-sro.dto';
import { SearchAuctionOrgsIndivListByFieldsDto } from './auction-orgs-indiv-list.dto';
import { SearchAuctionOrgsLegalListByFieldsDto } from './auction-orgs-legal-list.dto';

export class SearchMessagesPublisherListByFieldsDto {
  @ApiProperty({
    enum: message_publisher,
    required: false
  })
  @IsOptional()
  @IsEnum(message_publisher)
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly type: message_publisher;

  @ApiProperty({
    type: SearchDictSroByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchDictSroByFieldsDto)
  readonly DictSro: SearchDictSroByFieldsDto;

  @ApiProperty({
    type: SearchArbManagersListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchArbManagersListByFieldsDto)
  readonly ArbManagersList: SearchArbManagersListByFieldsDto;

  @ApiProperty({
    type: SearchAuctionOrgsIndivListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchAuctionOrgsIndivListByFieldsDto)
  readonly AuctionOrgsIndivList: SearchAuctionOrgsIndivListByFieldsDto;

  @ApiProperty({
    type: SearchAuctionOrgsLegalListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchAuctionOrgsLegalListByFieldsDto)
  readonly AuctionOrgsLegalList: SearchAuctionOrgsLegalListByFieldsDto;
}

export class SearchMessagesPublisherListDto {
  @ApiProperty({
    type: SearchPaginationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchPaginationDto)
  readonly pagination: SearchPaginationDto;

  @ApiProperty({
    type: SearchMessagesPublisherListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchMessagesPublisherListByFieldsDto)
  readonly fields: SearchMessagesPublisherListByFieldsDto;
}
