import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthAdminService } from './auth.admin-service';
import { AuthUserService } from './auth.user-service';
import { JwtStrategy } from './strategies/passport_jwt';
import { LocalStrategy } from './strategies/passport_local';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './serialization.provider';
import { EMailModule } from '../e-mail';
import { PassportModule } from '../fastify-passport';
import { UsersListModule } from '../users/list';
import { AdminsModule } from '../admins';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: process.env?.JWT_EXPIRES_IN_HOURS + 'h' },
      secret: process.env?.JWT_SECRET
    }),
    AdminsModule,
    forwardRef(() => UsersListModule),
    PassportModule,
    EMailModule
  ],
  controllers: [AuthController],
  providers: [
    AuthAdminService,
    AuthUserService,
    LocalStrategy,
    JwtStrategy,
    AuthSerializer
  ]
})
export class AuthModule {}
