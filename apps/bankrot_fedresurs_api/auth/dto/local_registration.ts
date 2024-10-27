import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class LocalRegistrationDto {
  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Неправильный e-mail' })
  @Length(7, 20, { message: 'От 7 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly email: string;

  @ApiProperty()
  @Matches(/([0-9a-zA-Z_])/, {
    message: 'Login must include only letters or digits'
  })
  @IsString({ message: 'Must be a string' })
  @Length(5, 20, { message: 'От 5 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly login: string;

  @ApiProperty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message: 'Password must include special char, capital char, also a digit'
  })
  @IsString({ message: 'Must be a string' })
  @Length(7, 20, { message: 'От 7 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly password: string;
}
