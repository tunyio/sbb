import { UpdateDictAuctPlatformsSroDto as UpdateDictAuctPlatformsSroDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictAuctPlatformsSro.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDictAuctPlatformsSroDto
  implements Required<UpdateDictAuctPlatformsSroDtoGenerated>
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
  @IsString({ message: 'Must be a string' })
  register_number: string;
}
