import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthAdminService } from './auth.admin-service';
import { AuthUserService } from './auth.user-service';
import { LocalAuthGuard } from './guards';
import { AppRequest } from '../common/typing';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalRegistrationDto, ResetPasswordDto } from './dto';
import { LocalLoginDto } from './dto/local_login';

@ApiTags(
  '_Authentication ᵃˡˡ ᵐᵉᵗʰᵒᵈˢ ʷ/ᵒ ᵃᵘᵗʰ⁻ᵗᵒᵏᵉⁿ , ᵇᵘᵗ ʳᵉᵍᶦˢᵗʳᵃᵗᶦᵒⁿ ⁻ ᶠᵒʳ ˢᵘᵖᵉʳ⁻ᵃᵈᵐᶦⁿˢ ᵒⁿˡʸ'
)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authAdminService: AuthAdminService,
    private readonly authUserService: AuthUserService
  ) {}

  @ApiOperation({ summary: 'Registration by login, e-mail and password' })
  @Post('local-registration')
  localRegistration(@Body() userDto: LocalRegistrationDto) {
    return this.authUserService.registration(userDto);
  }

  @ApiOperation({ summary: 'Login by login or e-mail - both with password' })
  @UseGuards(LocalAuthGuard)
  @Post('local-login')
  async localLogin(@Body() userDto: LocalLoginDto, @Request() req: AppRequest) {
    return this.authUserService.getAuthTokenWithUser(req.user);
  }

  @ApiOperation({
    summary: 'Send a link for restore password by email'
  })
  @Get('reset-password/:email')
  async resetPassword(@Param('email') email: string) {
    return this.authUserService.resetPassword(email);
  }

  @ApiOperation({
    summary: 'Restore password by token, email and new password'
  })
  @Post('restore-password')
  restorePassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authUserService.restorePassword(resetPasswordDto);
  }
}
