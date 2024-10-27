import { UpdateDictMessageTypesDto as UpdateDictMessageTypesDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictMessageTypes.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDictMessageTypesDto
  implements Required<UpdateDictMessageTypesDtoGenerated>
{
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
  @IsNumber({}, { message: 'Must be a number' })
  parent_id: number;
}
