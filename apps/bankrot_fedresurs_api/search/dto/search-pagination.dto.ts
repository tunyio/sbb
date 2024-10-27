import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class SearchPaginationDto {
  @ApiProperty({
    example: '0',
    required: false
  })
  @IsOptional()
  @Min(0)
  @Max(100)
  @IsInt()
  readonly pageFrom: number;

  @ApiProperty({
    example: '1',
    required: false
  })
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  readonly pageSize: number;
}
