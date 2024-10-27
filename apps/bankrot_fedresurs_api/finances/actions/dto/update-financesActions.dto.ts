import { UpdateFinancesActionsDto as UpdateFinancesActionsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-financesActions.dto';
import {
  finances_actions_type,
  finances_actions_description
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateFinancesActionsDto
  implements Required<UpdateFinancesActionsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: finances_actions_type })
  @IsOptional()
  @IsEnum(finances_actions_type)
  type: finances_actions_type;

  @ApiProperty({ enum: finances_actions_description })
  @IsOptional()
  @IsEnum(finances_actions_description)
  desc: finances_actions_description;
}
