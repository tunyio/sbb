import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SearchPaginationDto } from './search-pagination.dto';
import { SearchDictSroByFieldsDto } from './dict-sro.dto';

export class SearchArbManagersListByFieldsDto {
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
  readonly registry_number: string;

  @ApiProperty({
    type: SearchDictSroByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchDictSroByFieldsDto)
  readonly DictSro: SearchDictSroByFieldsDto;
}

export class SearchArbManagersListDto {
  @ApiProperty({
    type: SearchPaginationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchPaginationDto)
  readonly pagination: SearchPaginationDto;

  @ApiProperty({
    type: SearchArbManagersListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchArbManagersListByFieldsDto)
  readonly fields: SearchArbManagersListByFieldsDto;
}
