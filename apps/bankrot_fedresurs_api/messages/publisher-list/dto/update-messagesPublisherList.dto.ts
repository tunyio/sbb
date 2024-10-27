import { message_publisher } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { UpdateMessagesPublisherListDto as UpdateMessagesPublisherListDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-messagesPublisherList.dto';

export class UpdateMessagesPublisherListDto
  implements Required<UpdateMessagesPublisherListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: message_publisher })
  @IsOptional()
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
