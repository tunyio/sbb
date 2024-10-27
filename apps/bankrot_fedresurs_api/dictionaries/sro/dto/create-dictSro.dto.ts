import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CreateDictSroDto as CreateDictSroDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-dictSro.dto';
import { sro_document_type } from '@prisma/client';

export class CreateDictSroDto implements Required<CreateDictSroDtoGenerated> {
  deleted_at: Date;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  code: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  register_number: string;

  @ApiProperty({ enum: sro_document_type })
  @IsEnum(sro_document_type)
  document_type: sro_document_type;
}
