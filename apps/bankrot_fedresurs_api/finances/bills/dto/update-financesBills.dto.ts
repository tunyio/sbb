import { UpdateFinancesBillsDto as UpdateFinancesBillsDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-financesBills.dto';
import { ApiProperty } from '@nestjs/swagger';
import { finances_bills_status } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFinancesBillsDto
  implements Required<UpdateFinancesBillsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: finances_bills_status })
  @IsOptional()
  @IsEnum(finances_bills_status)
  status: finances_bills_status;
}
