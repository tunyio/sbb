import { CreateArbManagersReportsDto as CreateArbManagersReportsDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-arbManagersReports.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  arb_manager_report_type,
  arb_manager_reports_procedure_type
} from '@prisma/client';

export class CreateArbManagersReportsDto
  implements Required<CreateArbManagersReportsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: arb_manager_report_type })
  @IsEnum(arb_manager_report_type)
  type: arb_manager_report_type;

  @ApiProperty({ enum: arb_manager_reports_procedure_type })
  @IsEnum(arb_manager_reports_procedure_type)
  procedure_type: arb_manager_reports_procedure_type;
}
