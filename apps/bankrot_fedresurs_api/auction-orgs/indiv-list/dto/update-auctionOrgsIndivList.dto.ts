import { UpdateAuctionOrgsIndivListDto as UpdateAuctionOrgsIndivListDtoGenerated } from '../../../prisma/generated/nestjs-dto/update-auctionOrgsIndivList.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAuctionOrgsIndivListDto
  implements Required<UpdateAuctionOrgsIndivListDtoGenerated>
{
  deleted_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name_first: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name_second: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name_family: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  name_full: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  address: string;
}
