
import {finances_actions_type,finances_actions_description} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateFinancesActionsDto {
  deleted_at?: Date;
@ApiProperty({ enum: finances_actions_type})
type?: finances_actions_type;
@ApiProperty({ enum: finances_actions_description})
desc?: finances_actions_description;
}
