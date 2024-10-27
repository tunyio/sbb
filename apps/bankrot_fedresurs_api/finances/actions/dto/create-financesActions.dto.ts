import { CreateFinancesActionsDto as CreateFinancesActionsDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-financesActions.dto';
import {
  finances_actions_type,
  finances_actions_description
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateFinancesActionsDto
  implements Required<CreateFinancesActionsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: finances_actions_type })
  @IsEnum(finances_actions_type)
  type: finances_actions_type;

  @ApiProperty({ enum: finances_actions_description })
  @IsOptional()
  @IsEnum(finances_actions_description)
  desc: finances_actions_description;
}
