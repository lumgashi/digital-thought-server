import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

export const encodeJwt = (userId: string): string => {
  //https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node
  const config = new ConfigService();
  const date = new Date();
  const mail = {
    id: userId,
    created: date.toString(),
  };

  const token_mail_verification = jwt.sign(mail, config.get('app.jwtSecret'), {
    expiresIn: '5h',
  });

  const url =
    config.get('app.clientBaseUrl') + 'verify?id=' + token_mail_verification;

  return url;
};
