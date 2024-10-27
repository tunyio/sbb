import { CreateDeptorsLegalListDto as CreateDeptorsLegalListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-deptorsLegalList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { legal_entities_debtors_status } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeptorsLegalListDto
  implements Required<CreateDeptorsLegalListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: legal_entities_debtors_status })
  @IsEnum(legal_entities_debtors_status)
  category: legal_entities_debtors_status;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  code_inn: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  code_ogrn: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  code_okpo: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  region_id: number;
}
