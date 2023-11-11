import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { customResponse } from 'src/utils/functions';
import { generateEmailTemplate } from 'src/utils/functions/email/emailTemplate';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

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
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = this.config.get('app.brevoApiKey');

    // const partnerKey = defaultClient.authentications['partner-key'];
    // partnerKey.apiKey =
    //   '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';

    // Configure API key authorization: api-key

    // Set the required headers
    defaultClient.defaultHeaders['Content-Type'] = 'application/json';
    defaultClient.defaultHeaders['Accept'] = 'application/json';

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    console.log('apiInstance', apiInstance);

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
      to: [
        {
          email: 'lummgashi@gmail.com',
          name: 'John Doe',
        },
      ],
      templateId: 1,
      params: {
        name: 'Lum',
        surname: 'Gashi',
      },
      headers: {
        'X-Mailin-custom':
          'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      },
    };

    console.log('sendSmtpEmail', sendSmtpEmail);

    const msg = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(msg);
    try {
      // const resend = new Resend('re_WW9Lpqom_3znCPn7dmtqYz2M5uDJxisNG');
      // const ema = await resend.emails.send({
      //   from: 'onboarding@resend.dev',
      //   to,
      //   subject,
      //   html: generateEmailTemplate({ body }),
      // });
      // console.log(ema);
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
