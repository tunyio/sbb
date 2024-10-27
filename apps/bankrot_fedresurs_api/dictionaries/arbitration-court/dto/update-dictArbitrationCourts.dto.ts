import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateDictArbitrationCourtsDto as UpdateDictArbitrationCourtsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictArbitrationCourts.dto';

export class UpdateDictArbitrationCourtsDto
  implements Required<UpdateDictArbitrationCourtsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  title: string;
}
