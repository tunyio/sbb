import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { CreateDictOkopfDto as CreateDictOkopfDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-dictOkopf.dto';

export class CreateDictOkopfDto implements Required<CreateDictOkopfDtoGenerated> {
  deleted_at: Date;

  @ApiProperty()
  @IsNumber({}, { message: 'Must be a number' })
  code: number;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty()
  @IsBoolean({ message: 'Must be a boolean' })
  canceled: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  parent_id: number;
}
