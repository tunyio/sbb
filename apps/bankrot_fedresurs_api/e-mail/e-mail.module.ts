import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EMailService } from './e-mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env?.SMTP_HOST,
        port: process.env?.SMTP_PORT,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env?.SMTP_USER,
          pass: process.env?.SMTP_PASSWORD
        }
      },
      defaults: {
        from: `"bankrupt" <${process.env?.NOREPLY_EMAIL_FROM}>`
      },
      template: {
        dir: join(__dirname, 'templates/pages'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      },
      options: {
        partials: {
          dir: join(__dirname, 'templates/partials'),
          options: {
            strict: true
          }
        }
      }
    })
  ],
  providers: [EMailService],
  exports: [EMailService]
})
export class EMailModule {}
