import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordRestoreLink(email: string, link: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: 'Восстановление пароля',
        template: './password_restore_link',
        context: {
          link
        }
      });
    } catch (e) {
      return false;
    }
  }
}
