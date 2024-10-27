import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
  forwardRef,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LocalRegistrationDto, ResetPasswordDto } from './dto';
import { EMailService } from '../e-mail';
import * as process from 'process';
import { FastifyReply } from 'fastify';
import { PassportUser } from '../common/typing/based-on-prisma-models';
import { UsersListDbService } from '../users/list';
import { AuthJwtPayload } from '../common/typing';

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(forwardRef(() => UsersListDbService))
    private readonly usersListDbService: UsersListDbService,
    private readonly jwtService: JwtService,
    private readonly emailService: EMailService
  ) {}

  hashPassword = async (password: string) => bcrypt.hash(password, 12);

  async registration(userDto: LocalRegistrationDto) {
    // Validation existing login or e-mail
    const err = {
      login: 'Login уже зарегистрирован!',
      email: 'E-mail уже зарегистрирован!'
    };
    if (
      !(
        await this.usersListDbService.getPassportUserByLoginOrEmail(userDto.login)
      ).data_not_admin
    ) {
      delete err.login;
    }
    if (
      !(
        await this.usersListDbService.getPassportUserByLoginOrEmail(userDto.email)
      ).data_not_admin
    ) {
      delete err.email;
    }
    if (Object.getOwnPropertyNames(err).length) {
      throw new BadRequestException(err);
    }

    // Creating new user
    const passwordHash = (await this.hashPassword(userDto.password)) as string;
    const user = await this.usersListDbService.createUserWithEmail(
      { login: userDto.login, passw_hash: passwordHash },
      userDto.email
    );

    return this.getAuthTokenWithUser(user);
  }

  getAuthTokenWithUser(user: PassportUser) {
    const userData = user.data_not_admin;
    const expirationUnixTime =
      Math.floor(Date.now() / 1000) +
      60 * parseInt(process.env?.JWT_EXPIRES_IN_HOURS);

    const payload: AuthJwtPayload = {
      expirationUnixTime,
      sub: userData.id,
      login: userData.login,
      isAdmin: false
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        ...userData,
        // Clear sensible property
        passw_hash: undefined
      }
    };
  }

  async validateUserByLoginOrEmailAndPass(
    loginOrEmail: string,
    password: string
  ): Promise<PassportUser> {
    const user =
      await this.usersListDbService.getPassportUserByLoginOrEmail(loginOrEmail);

    const userData = user.data_not_admin;
    if (!userData)
      throw new UnauthorizedException({
        login_or_email: 'Login/e-mail не найден'
      });

    const oldAndNewPasswordsEquals =
      !!userData?.passw_hash &&
      (await bcrypt.compare(password, userData?.passw_hash));

    if (oldAndNewPasswordsEquals) return user;
    throw new UnauthorizedException({ password: 'Пароль не подходит' });
  }

  async resetPassword(email: string) {
    const user =
      await this.usersListDbService.getPassportUserByLoginOrEmail(email);

    if (!user.data_not_admin)
      throw new BadRequestException({ email: 'Email не найден' });

    this.sendRestorePasswordLink(user);
  }

  async sendRestorePasswordLink(user: PassportUser) {
    const contacts = user.data_not_admin.UsersContacts[0];
    const randomToken = await bcrypt.hash(new Date().toISOString(), 7);

    contacts.email_passw_reset_token = randomToken;
    await this.usersListDbService.savePassportUser(user);

    this.emailService.sendPasswordRestoreLink(
      contacts.email,
      `${process.env?.NEXT_PUBLIC_SERVER_URL}${process.env?.NEXT_PASSWORD_RESTORE_PAGE}?email=${contacts.email}&token=${randomToken}`
    );
  }

  async restorePassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersListDbService.getPassportUserByLoginOrEmail(
      resetPasswordDto.email
    );
    if (!user.data_not_admin)
      throw new BadRequestException({ message: 'E-mail не найден' });

    const contacts = user.data_not_admin.UsersContacts[0];

    if (
      contacts.email_passw_reset_token &&
      contacts.email_passw_reset_token === resetPasswordDto.token
    ) {
      user.data_not_admin.passw_hash = await this.hashPassword(
        resetPasswordDto.newPassword
      );
      contacts.email_passw_reset_token = null;
      await this.usersListDbService.savePassportUser(user);

      return true;
    } else {
      throw new HttpException('Token incorrect or expired', HttpStatus.FORBIDDEN);
    }
  }
}
