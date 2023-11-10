import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    const configService = new ConfigService();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('app.jwtSecret', { infer: true }),
    });
  }

  async validate(payload: { userId: string; role: string }) {
    const { userId, role } = payload;

    return await this.usersService.findOne(userId);

    // const user = await this.usersService.findByUnique({ id: userId });
    // // we can validate here every specific user by using findUnique of prisma function,
    // // and select wich fields needs to be shown for every user
    // if (!user) {
    //   throw new UnauthorizedException(
    //     getCustomResponse({
    //       status: HttpStatus.UNAUTHORIZED,
    //       success: false,
    //       errors: 'Unauthorized user',
    //       token_expired: true,
    //     }),
    //   );
    // }

    // return user;
  }
}
