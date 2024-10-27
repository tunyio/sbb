import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthUserService } from '../auth.user-service';
import { PassportStrategy } from '../../fastify-passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authUserService: AuthUserService) {
    super({ usernameField: 'login_or_email' });
  }

  // 'username' contains value of 'login_or_email' request property
  async validate(username: string, password: string): Promise<any> {
    return await this.authUserService.validateUserByLoginOrEmailAndPass(
      username,
      password
    );
  }
}
