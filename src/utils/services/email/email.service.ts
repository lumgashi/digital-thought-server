import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { customResponse } from 'src/utils/functions';
import { generateEmailTemplate } from 'src/utils/functions/email/emailTemplate';

@Injectable()
// we can use same service for mailTrap and MailJet just in
// constructor we can sent config.nodeEnv
export class EmailService {
  private readonly apiKey: string;
  private nodeEnv = '';
  private apiInstance;
  constructor(private config: ConfigService) {
    this.nodeEnv = this.config.get('app.nodeEnv');
    if (this.nodeEnv === 'development') {
      this.apiKey = config.get('app.resendApi');
    } else if (this.nodeEnv === 'production') {
    }
  }
  async send({ to, subject, body }: IEmail) {
    try {
      const resend = new Resend('re_WW9Lpqom_3znCPn7dmtqYz2M5uDJxisNG');
      const ema = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html: generateEmailTemplate({ body }),
      });
      console.log(ema);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        customResponse({
          errors: 'Email sending failed',
          success: false,
          status: HttpStatus.BAD_REQUEST,
        }),
      );
    }
  }
}

interface IEmail {
  to?: string | Array<string>;
  subject: string;
  body?: string;
}

// interface ICommunication {
//   emailDetails: IEmail;
//   user: User;
//   comment: string;
// }
