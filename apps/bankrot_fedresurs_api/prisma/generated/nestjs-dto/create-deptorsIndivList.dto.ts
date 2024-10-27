
import {individuals_debtors_status} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateDeptorsIndivListDto {
  deleted_at?: Date;
@ApiProperty({ enum: individuals_debtors_status})
category?: individuals_debtors_status;
name_first?: string;
name_second?: string;
name_family?: string;
address?: string;
code_inn?: string;
code_ogrnip?: string;
code_snils?: string;
}
