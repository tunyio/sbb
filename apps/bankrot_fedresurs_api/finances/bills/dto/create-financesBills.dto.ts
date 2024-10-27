import { CreateFinancesBillsDto as CreateFinancesBillsDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-financesBills.dto';
import { ApiProperty } from '@nestjs/swagger';
import { finances_bills_status } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFinancesBillsDto
  implements Required<CreateFinancesBillsDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: finances_bills_status })
  @IsEnum(finances_bills_status)
  status: finances_bills_status;
}
