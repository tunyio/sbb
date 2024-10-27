import { UpdateArbManagersActionsDto as UpdateArbManagersActionsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-arbManagersActions.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  arb_manager_actions_type,
  arb_manager_actions_description
} from '@prisma/client';

export class UpdateArbManagersActionsDto
  implements Required<UpdateArbManagersActionsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: arb_manager_actions_type })
  @IsOptional()
  @IsEnum(arb_manager_actions_type)
  type: arb_manager_actions_type;

  @ApiProperty({ enum: arb_manager_actions_description })
  @IsOptional()
  @IsEnum(arb_manager_actions_description)
  desc: arb_manager_actions_description;
}
