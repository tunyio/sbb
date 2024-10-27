import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SearchPaginationDto } from './search-pagination.dto';

export class SearchAuctionOrgsLegalListByFieldsDto {
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly name: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly address: string;
}

export class SearchAuctionOrgsLegalListDto {
  @ApiProperty({
    type: SearchPaginationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchPaginationDto)
  readonly pagination: SearchPaginationDto;

  @ApiProperty({
    type: SearchAuctionOrgsLegalListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchAuctionOrgsLegalListByFieldsDto)
  readonly fields: SearchAuctionOrgsLegalListByFieldsDto;
}
