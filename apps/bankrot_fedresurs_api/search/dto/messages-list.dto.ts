import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  Min,
  Max,
  IsByteLength,
  IsISO8601,
  IsOptional,
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsEnum
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { message_status } from '@prisma/client';
import { PG_DATATYPE_LIMITS } from '../../common/utils/postgres-datatypes';
import { SearchPaginationDto } from './search-pagination.dto';
import { SearchMessagesPublisherListByFieldsDto } from './messages-publisher-list.dto';
import { SearchDeptorsIndivListByFieldsDto } from './deptors-indiv-list.dto';
import { SearchDeptorsLegalListByFieldsDto } from './deptors-legal-list.dto';

export class SearchMessagesListByFieldsDto {
  @ApiProperty({
    example: '1',
    required: false
  })
  @IsOptional()
  @Min(1)
  @Max(PG_DATATYPE_LIMITS.MAX_INT_32)
  @IsInt()
  readonly number: number;

  @ApiProperty({
    example: '1',
    required: false
  })
  @IsOptional()
  @Min(1)
  @Max(PG_DATATYPE_LIMITS.MAX_INT_32)
  @IsInt()
  readonly message_type_id: number;

  @ApiProperty({
    enum: message_status,
    required: false
  })
  @IsOptional()
  @IsEnum(message_status)
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly status: message_status;

  @ApiProperty({
    example: '2021-08-30T10:30:00Z',
    description: 'ISO 8601',
    required: false
  })
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => value.trim())
  readonly publication_date_start: string;

  @ApiProperty({
    example: '2021-08-30T20:30:00Z',
    description: 'ISO 8601',
    required: false
  })
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => value.trim())
  readonly publication_date_end: string;

  @ApiProperty({
    type: SearchMessagesPublisherListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchMessagesPublisherListByFieldsDto)
  readonly MessagesPublisherList: SearchMessagesPublisherListByFieldsDto;

  @ApiProperty({
    type: SearchDeptorsIndivListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchDeptorsIndivListByFieldsDto)
  readonly DeptorsIndivList: SearchDeptorsIndivListByFieldsDto;

  @ApiProperty({
    type: SearchDeptorsLegalListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchDeptorsLegalListByFieldsDto)
  readonly DeptorsLegalList: SearchDeptorsLegalListByFieldsDto;
}

export class SearchMessagesListDto {
  @ApiProperty({
    type: SearchPaginationDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchPaginationDto)
  readonly pagination: SearchPaginationDto;

  @ApiProperty({
    type: SearchMessagesListByFieldsDto,
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchMessagesListByFieldsDto)
  readonly fields: SearchMessagesListByFieldsDto;
}
