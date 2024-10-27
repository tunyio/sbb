import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateDictAuctPlatformsDto as UpdateDictAuctPlatformsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictAuctPlatforms.dto';

export class UpdateDictAuctPlatformsDto
  implements Required<UpdateDictAuctPlatformsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  title: string;
}
