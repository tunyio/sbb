
import {finances_bills_status} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateFinancesBillsDto {
  deleted_at?: Date;
@ApiProperty({ enum: finances_bills_status})
status?: finances_bills_status;
}
