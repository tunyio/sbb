import { CreateAuctionOrgsLegalListDto as CreateAuctionOrgsLegalListDtoGenerated } from '../../../prisma/generated/nestjs-dto/create-auctionOrgsLegalList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAuctionOrgsLegalListDto
  implements Required<CreateAuctionOrgsLegalListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  address: string;
}
