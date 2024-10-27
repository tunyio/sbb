import { CreateDictAuctPlatformsSroDto as CreateDictAuctPlatformsSroDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-dictAuctPlatformsSro.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDictAuctPlatformsSroDto
  implements Required<CreateDictAuctPlatformsSroDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  code: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  register_number: string;
}
