import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UpdateDictArbitrationCourtsDto as UpdateDictArbitrationCourtsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-dictArbitrationCourts.dto';

export class CreateDictArbitrationCourtsDto
  implements Required<UpdateDictArbitrationCourtsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  title: string;
}
