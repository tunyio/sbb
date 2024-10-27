
import {arb_manager_actions_type,arb_manager_actions_description} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateArbManagersActionsDto {
  deleted_at?: Date;
@ApiProperty({ enum: arb_manager_actions_type})
type?: arb_manager_actions_type;
@ApiProperty({ enum: arb_manager_actions_description})
desc?: arb_manager_actions_description;
}
