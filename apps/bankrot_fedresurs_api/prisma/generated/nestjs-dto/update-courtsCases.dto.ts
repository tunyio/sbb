
import {courts_cases_status,courts_cases_deptor_status,courts_cases_procedure_termn_reason,finances_bills_status} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateCourtsCasesDto {
  created_at?: Date;
deleted_at?: Date;
@ApiProperty({ enum: courts_cases_status})
status?: courts_cases_status;
@ApiProperty({ enum: courts_cases_deptor_status})
deptor_status?: courts_cases_deptor_status;
@ApiProperty({ enum: courts_cases_procedure_termn_reason})
procedure_termination_reason?: courts_cases_procedure_termn_reason;
@ApiProperty({ enum: finances_bills_status})
finances_bills_status?: finances_bills_status;
laim_number_n_judge_code?: string;
}
