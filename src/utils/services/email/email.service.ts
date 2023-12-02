import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { customResponse } from 'src/utils/functions';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { generateEmailTemplate } from 'src/utils/functions/email';

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
  async sendWithTemplates({ to, templateId }: IEmail) {
    try {
      const defaultClient = SibApiV3Sdk.ApiClient.instance;
      const apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = this.config.get('app.brevoApiKey');

      // Set the required headers
      defaultClient.defaultHeaders['Content-Type'] = 'application/json';
      defaultClient.defaultHeaders['Accept'] = 'application/json';

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

      sendSmtpEmail = {
        to: [
          {
            email: to,
            // name: 'John Doe',
          },
        ],
        templateId,
        params: {
          name: 'Lum',
          surname: 'Gashi',
        },
        headers: {
          'X-Mailin-custom':
            'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        },
      };

      await apiInstance.sendTransacEmail(sendSmtpEmail);
      // const resend = new Resend('re_WW9Lpqom_3znCPn7dmtqYz2M5uDJxisNG');
      // const ema = await resend.emails.send({
      //   from: 'onboarding@resend.dev',
      //   to,
      //   subject,
      //   html: generateEmailTemplate({ body }),
      // });
      // console.log(ema);
    } catch (err) {
      throw new BadRequestException(
        customResponse({
          errors: 'Email sending failed',
          success: false,
          status: HttpStatus.BAD_REQUEST,
        }),
      );
    }
  }

  async sendEmail({ to, body, subject }: IEmail) {
    try {
      const defaultClient = SibApiV3Sdk.ApiClient.instance;
      const apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = this.config.get('app.brevoApiKey');

      // Set the required headers
      defaultClient.defaultHeaders['Content-Type'] = 'application/json';
      defaultClient.defaultHeaders['Accept'] = 'application/json';

      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

      let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

      sendSmtpEmail = {
        sender: { email: 'lumgash04@gmail.com', name: 'Lum' },
        subject: subject,
        htmlContent: generateEmailTemplate({ body }),
        params: {
          greeting: 'This is the default greeting',
          headline: 'This is the default headline',
        },
        messageVersions: [
          // Definition for Message Version 2
          {
            to: [
              {
                email: to,
                name: 'Jim Stevens',
              },
            ],
          },
        ],
      };

      await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      console.log(error);
    }
  }
}

interface IEmail {
  to?: string | Array<string>;
  templateId?: number;
  body?: string;
  subject?: string;
}

// interface ICommunication {
//   emailDetails: IEmail;
//   user: User;
//   comment: string;
// }
