import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Неправильный e-mail' })
  @Length(7, 20, { message: 'От 7 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly email: string;

  @ApiProperty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message: 'New password must include special char, capital char, also a digit'
  })
  @IsString({ message: 'Must be a string' })
  @Length(7, 20, { message: 'От 7 до 20 символов' })
  @Transform(({ value }) => value.trim())
  readonly newPassword: string;

  @ApiProperty()
  @IsString({ message: 'Must be a string' })
  @Transform(({ value }) => value.trim())
  readonly token: string;
}
