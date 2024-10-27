import { CreateDeptorsIndivListDto as CreateDeptorsIndivListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-deptorsIndivList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { individuals_debtors_status } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeptorsIndivListDto
  implements Required<CreateDeptorsIndivListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: individuals_debtors_status })
  @IsEnum(individuals_debtors_status)
  category: individuals_debtors_status;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  name_first: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name_second: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name_family: string;

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
  code_ogrnip: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  code_snils: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  region_id: number;
}
