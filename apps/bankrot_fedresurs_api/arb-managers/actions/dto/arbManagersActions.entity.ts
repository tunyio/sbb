import {
  arb_manager_actions_type,
  arb_manager_actions_description
} from '@prisma/client';
import { ArbManagersActions as ArbManagersActionsGenerated } from '../../../prisma/generated/nestjs-dto/arbManagersActions.entity';
import { ArbManagersList } from '../../list/dto';
import { ApiProperty } from '@nestjs/swagger';

export class ArbManagersActions implements Required<ArbManagersActionsGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  arb_manager_id: number;

  @ApiProperty({ enum: arb_manager_actions_type })
  type: arb_manager_actions_type | null;

  @ApiProperty({ enum: arb_manager_actions_description })
  desc: arb_manager_actions_description | null;

  // Relations:
  ArbManagersList: ArbManagersList;
}
