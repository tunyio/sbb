import { message_publisher } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CreateMessagesPublisherListDto as CreateMessagesPublisherListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-messagesPublisherList.dto';

export class CreateMessagesPublisherListDto
  implements Required<CreateMessagesPublisherListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: message_publisher })
  @IsEnum(message_publisher)
  type: message_publisher;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  arb_manager_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  auction_org_legal_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  auction_org_indiv_id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Must be a number' })
  sro_id: number;
}
