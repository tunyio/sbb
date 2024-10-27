import { CreateDictRegionDto as CreateDictRegionDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-dictRegion.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDictRegionDto
  implements Required<CreateDictRegionDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  okato_oktmo_code: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;
}
