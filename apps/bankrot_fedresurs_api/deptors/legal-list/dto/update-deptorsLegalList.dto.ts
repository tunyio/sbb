import { UpdateDeptorsLegalListDto as UpdateDeptorsLegalListDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-deptorsLegalList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { legal_entities_debtors_status } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeptorsLegalListDto
  implements Required<UpdateDeptorsLegalListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: legal_entities_debtors_status })
  @IsOptional()
  @IsEnum(legal_entities_debtors_status)
  category: legal_entities_debtors_status;

  @ApiProperty()
  @IsOptional()
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
