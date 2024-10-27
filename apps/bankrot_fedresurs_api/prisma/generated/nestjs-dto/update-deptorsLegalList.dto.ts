
import {legal_entities_debtors_status} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateDeptorsLegalListDto {
  deleted_at?: Date;
@ApiProperty({ enum: legal_entities_debtors_status})
category?: legal_entities_debtors_status;
name?: string;
address?: string;
code_inn?: string;
code_ogrn?: string;
code_okpo?: string;
}
