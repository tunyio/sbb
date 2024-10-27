import {
  arb_manager_report_type,
  arb_manager_reports_procedure_type
} from '@prisma/client';
import { ArbManagersReports as ArbManagersReportsGenerated } from '../../../prisma/generated/nestjs-dto/arbManagersReports.entity';
import { ArbManagersList } from '../../list/dto';
import { ApiProperty } from '@nestjs/swagger';

export class ArbManagersReports implements Required<ArbManagersReportsGenerated> {
  @ApiProperty()
  id: number;

  deleted_at: Date | null;

  @ApiProperty()
  arb_manager_id: number;

  @ApiProperty({ enum: arb_manager_report_type })
  type: arb_manager_report_type | null;

  @ApiProperty({ enum: arb_manager_reports_procedure_type })
  procedure_type: arb_manager_reports_procedure_type | null;

  // Relations:
  ArbManagersList: ArbManagersList;
}
