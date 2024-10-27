import { UpdateAuctionOrgsLegalListDto as UpdateAuctionOrgsLegalListDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-auctionOrgsLegalList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAuctionOrgsLegalListDto
  implements Required<UpdateAuctionOrgsLegalListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  address: string;
}
