import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { customResponse } from 'src/utils/functions';
//import { getCustomResponse } from 'src/utils/functions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any) {
    // Handle any error thrown by the authentication process
    if (err || !user) {
      throw (
        new BadRequestException(
          customResponse({
            status: HttpStatus.BAD_REQUEST,
            success: false,
            errors: err,
            token_expired: true,
          }),
        ) ||
        new UnauthorizedException(
          customResponse({
            success: false,
            errors: 'Unauthorized user',
            token_expired: true,
            status: HttpStatus.UNAUTHORIZED,
          }),
        )
      );
    }
    return user;
  }
}
