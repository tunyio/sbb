import { UpdateArbManagersReportsDto as UpdateArbManagersReportsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-arbManagersReports.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  arb_manager_report_type,
  arb_manager_reports_procedure_type
} from '@prisma/client';

export class UpdateArbManagersReportsDto
  implements Required<UpdateArbManagersReportsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: arb_manager_report_type })
  @IsOptional()
  @IsEnum(arb_manager_report_type)
  type: arb_manager_report_type;

  @ApiProperty({ enum: arb_manager_reports_procedure_type })
  @IsOptional()
  @IsEnum(arb_manager_reports_procedure_type)
  procedure_type: arb_manager_reports_procedure_type;
}
