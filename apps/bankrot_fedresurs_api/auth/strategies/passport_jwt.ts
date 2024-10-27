import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '../../fastify-passport';
import { UsersListDbService } from '../../users/list';
import { AuthJwtPayload } from '../../common/typing';
import { AdminsListDbService } from '../../admins/list/list.db-service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly adminsListDbService: AdminsListDbService,
    @Inject(forwardRef(() => UsersListDbService))
    private readonly usersListDbService: UsersListDbService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env?.JWT_SECRET
    });
  }

  validate(payload: AuthJwtPayload) {
    if (payload.isAdmin) {
      return this.adminsListDbService.getPassportUserById(payload.sub);
    } else {
      return this.usersListDbService.getPassportUserById(payload.sub);
    }
  }
}
