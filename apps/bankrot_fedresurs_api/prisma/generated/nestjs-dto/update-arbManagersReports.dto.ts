
import {arb_manager_report_type,arb_manager_reports_procedure_type} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateArbManagersReportsDto {
  deleted_at?: Date;
@ApiProperty({ enum: arb_manager_report_type})
type?: arb_manager_report_type;
@ApiProperty({ enum: arb_manager_reports_procedure_type})
procedure_type?: arb_manager_reports_procedure_type;
}
