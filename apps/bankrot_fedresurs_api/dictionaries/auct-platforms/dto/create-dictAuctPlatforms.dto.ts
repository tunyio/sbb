import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateDictAuctPlatformsDto as CreateDictAuctPlatformsDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-dictAuctPlatforms.dto';

export class CreateDictAuctPlatformsDto
  implements Required<CreateDictAuctPlatformsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;
}
