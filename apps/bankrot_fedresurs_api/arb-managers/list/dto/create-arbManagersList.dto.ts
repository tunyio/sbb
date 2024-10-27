import { CreateArbManagersListDto as CreateArbManagersListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-arbManagersList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArbManagersListDto
  implements Required<CreateArbManagersListDtoGenerated>
{
  deleted_at: Date;

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
  name_full: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  registry_number: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Must be a number' })
  user_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  sro_id: number;
}
