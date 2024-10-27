import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as process from 'process';
import { FastifyReply } from 'fastify';
import { AdminsListDbService } from '../admins/list/list.db-service';
import { PassportUser } from '../common/typing/based-on-prisma-models';
import { AuthJwtPayload } from '../common/typing';

@Injectable()
export class AuthAdminService {
  constructor(
    @Inject(forwardRef(() => AdminsListDbService))
    private readonly adminsListDbService: AdminsListDbService,
    private readonly jwtService: JwtService
  ) {}

  getAuthTokenWithAdmin(user: PassportUser) {
    const adminData = user.data_for_admin;
    const expirationUnixTime =
      Math.floor(Date.now() / 1000) +
      60 * parseInt(process.env?.JWT_EXPIRES_IN_HOURS);

    const payload: AuthJwtPayload = {
      expirationUnixTime,
      sub: adminData.id,
      login: adminData.login,
      isAdmin: true
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin: {
        ...adminData,
        // Clear sensible property
        passw_hash: undefined
      }
    };
  }

  async validateAdminByLoginAndPass(
    login: string,
    password: string
  ): Promise<PassportUser> {
    const admin = await this.adminsListDbService.getPassportUserByLogin(login);

    const adminData = admin.data_for_admin;
    if (!adminData)
      throw new UnauthorizedException({
        login_or_email: 'Login не найден'
      });

    const oldAndNewPasswordsEquals =
      !!adminData?.passw_hash &&
      (await bcrypt.compare(password, adminData?.passw_hash));

    if (oldAndNewPasswordsEquals) return admin;
    throw new UnauthorizedException({ password: 'Пароль не подходит' });
  }
}
