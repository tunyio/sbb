import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UpdateDictSroDto as UpdateDictSroDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictSro.dto';
import { sro_document_type } from '@prisma/client';

export class UpdateDictSroDto implements Required<UpdateDictSroDtoGenerated> {
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  register_number: string;

  @ApiProperty({ enum: sro_document_type })
  @IsOptional()
  @IsEnum(sro_document_type)
  document_type: sro_document_type;
}
