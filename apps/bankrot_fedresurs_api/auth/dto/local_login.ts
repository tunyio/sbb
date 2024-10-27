import {
  IsEmail,
  IsString,
  IsNumberString, // use it for number from url request param
  Length,
  Matches
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LocalLoginDto {
  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @Length(5, 20, { message: 'От 5 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly login_or_email: string;

  @ApiProperty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message: 'Password must include special char, capital char, also a digit'
  })
  @IsString({ message: 'Must be a string' })
  @Length(7, 20, { message: 'От 7 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly password: string;
}
