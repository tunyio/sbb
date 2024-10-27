
import {arb_manager_report_type,arb_manager_reports_procedure_type} from '@prisma/client'
import {ArbManagersList} from './arbManagersList.entity'


export class ArbManagersReports {
  id: number ;
deleted_at: Date  | null;
arb_manager_id: number ;
type: arb_manager_report_type  | null;
procedure_type: arb_manager_reports_procedure_type  | null;
ArbManagersList?: ArbManagersList ;
}
