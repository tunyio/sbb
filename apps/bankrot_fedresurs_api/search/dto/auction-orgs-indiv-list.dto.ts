import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SearchPaginationDto } from './search-pagination.dto';

export class SearchAuctionOrgsIndivListByFieldsDto {
  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly name_first: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly name_second: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly name_family: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly name_full: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly address: string;
}

export class SearchAuctionOrgsIndivListDto {
  @ApiProperty({
    type: SearchPaginationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchPaginationDto)
  readonly pagination: SearchPaginationDto;

  @ApiProperty({
    type: SearchAuctionOrgsIndivListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchAuctionOrgsIndivListByFieldsDto)
  readonly fields: SearchAuctionOrgsIndivListByFieldsDto;
}
