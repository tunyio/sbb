import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { UpdateDictOkopfDto as UpdateDictOkopfDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictOkopf.dto';

export class UpdateDictOkopfDto implements Required<UpdateDictOkopfDtoGenerated> {
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  code: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  canceled: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  parent_id: number;
}
