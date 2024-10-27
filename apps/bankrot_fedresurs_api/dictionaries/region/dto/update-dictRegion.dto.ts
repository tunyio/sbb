import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { UpdateDictRegionDto as UpdateDictRegionDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictRegion.dto';

export class UpdateDictRegionDto
  implements Required<UpdateDictRegionDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  okato_oktmo_code: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  title: string;
}
