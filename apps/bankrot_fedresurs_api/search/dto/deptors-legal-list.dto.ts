import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SearchPaginationDto } from './search-pagination.dto';
import { PG_DATATYPE_LIMITS } from '../../common/utils/postgres-datatypes';
import { legal_entities_debtors_status } from '@prisma/client';

export class SearchDeptorsLegalListByFieldsDto {
  @ApiProperty({
    example: '1',
    required: false
  })
  @IsOptional()
  @Min(1)
  @Max(PG_DATATYPE_LIMITS.MAX_INT_32)
  @IsInt()
  readonly region_id: number;

  @ApiProperty({
    enum: legal_entities_debtors_status,
    required: false
  })
  @IsOptional()
  @IsEnum(legal_entities_debtors_status)
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly category: legal_entities_debtors_status;

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

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly code: string;
}

export class SearchDeptorsLegalListDto {
  @ApiProperty({
    type: SearchPaginationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchPaginationDto)
  readonly pagination: SearchPaginationDto;

  @ApiProperty({
    type: SearchDeptorsLegalListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchDeptorsLegalListByFieldsDto)
  readonly fields: SearchDeptorsLegalListByFieldsDto;
}
