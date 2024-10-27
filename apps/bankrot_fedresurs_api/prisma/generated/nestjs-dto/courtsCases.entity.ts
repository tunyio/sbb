
import {courts_cases_status,courts_cases_deptor_status,courts_cases_procedure_termn_reason,finances_bills_status} from '@prisma/client'


export class CourtsCases {
  id: number ;
created_at: Date  | null;
deleted_at: Date  | null;
status: courts_cases_status  | null;
deptor_status: courts_cases_deptor_status  | null;
procedure_termination_reason: courts_cases_procedure_termn_reason  | null;
finances_bills_status: finances_bills_status  | null;
laim_number_n_judge_code: string  | null;
}
