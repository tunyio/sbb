import { UpdateMessagesListDto as UpdateMessagesListDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-messagesList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { message_status } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsBoolean,
  IsString,
  IsOptional,
  IsNumber
} from 'class-validator';

export class UpdateMessagesListDto
  implements Required<UpdateMessagesListDtoGenerated>
{
  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => value?.trim())
  updated_at: Date;

  deleted_at: Date;

  @ApiProperty({ enum: message_status })
  @IsOptional()
  @IsEnum(message_status)
  status: message_status;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  @Transform(({ value }) => value?.trim())
  publication_date: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  blocked: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  blocked_reason: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  message_type_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  publisher_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  deptor_legal_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  deptor_indiv_id: number;
}
