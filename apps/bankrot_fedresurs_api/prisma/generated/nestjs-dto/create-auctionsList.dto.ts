
import {auctions_type,auctions_status,auctions_price_proposal_submission_form} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateAuctionsListDto {
  deleted_at?: Date;
@ApiProperty({ enum: auctions_type})
type?: auctions_type;
@ApiProperty({ enum: auctions_status})
status?: auctions_status;
property_classifier?: string;
@ApiProperty({ enum: auctions_price_proposal_submission_form})
price_proposal_submission_form?: auctions_price_proposal_submission_form;
}
