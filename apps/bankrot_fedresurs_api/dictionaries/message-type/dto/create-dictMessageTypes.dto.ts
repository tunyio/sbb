import { CreateDictMessageTypesDto as CreateDictMessageTypesDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-dictMessageTypes.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDictMessageTypesDto
  implements Required<CreateDictMessageTypesDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  code: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  parent_id: number;
}
