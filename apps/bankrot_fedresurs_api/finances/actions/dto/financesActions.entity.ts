import {
  finances_actions_type,
  finances_actions_description
} from '@prisma/client';
import { FinancesActions as FinancesActionsGenerated } from '../../../prisma/generated/nestjs-dto/financesActions.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FinancesActions implements Required<FinancesActionsGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty({ enum: finances_actions_type })
  type: finances_actions_type | null;

  @ApiProperty({ enum: finances_actions_description })
  desc: finances_actions_description | null;
}
