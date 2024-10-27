import { CreateArbManagersActionsDto as CreateArbManagersActionsDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-arbManagersActions.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  arb_manager_actions_type,
  arb_manager_actions_description
} from '@prisma/client';

export class CreateArbManagersActionsDto
  implements Required<CreateArbManagersActionsDtoGenerated>
{
  deleted_at: Date;
  @ApiProperty({ enum: arb_manager_actions_type })
  @IsEnum(arb_manager_actions_type)
  type: arb_manager_actions_type;

  @ApiProperty({ enum: arb_manager_actions_description })
  @IsEnum(arb_manager_actions_description)
  desc: arb_manager_actions_description;
}
