import {
  auctions_type,
  auctions_status,
  auctions_price_proposal_submission_form
} from '@prisma/client';
import { CreateAuctionsListDto as CreateAuctionsListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-auctionsList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuctionsListDto
  implements Required<CreateAuctionsListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty({ enum: auctions_type })
  @IsEnum(auctions_type)
  type: auctions_type;

  @ApiProperty({ enum: auctions_status })
  @IsEnum(auctions_status)
  status: auctions_status;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  property_classifier: string;

  @ApiProperty({ enum: auctions_price_proposal_submission_form })
  @IsOptional()
  @IsEnum(auctions_price_proposal_submission_form)
  price_proposal_submission_form: auctions_price_proposal_submission_form;
}
