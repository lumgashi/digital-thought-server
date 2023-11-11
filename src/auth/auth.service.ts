import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  customResponse,
  hashPassword,
  matchPasswords,
  signToken,
} from 'src/utils/functions';
import { ICustomResponse } from 'src/utils/interfaces';
import { RegisterDto } from './dto';
import referalCode from 'src/utils/functions/referalCodeGenerator';
import { EmailService } from 'src/utils/services/email/email.service';
import { newJoinedUser } from 'src/utils/functions/email/emailTypes';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async login(email: string, password: string): Promise<ICustomResponse> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        customResponse({
          status: HttpStatus.NOT_FOUND,
          success: false,
          errors: 'No user found with given email!',
        }),
      );
    }

    try {
      await matchPasswords(password, user.password);
      const payload = { userId: user.id, email: user.email, role: user.role };
      const accessToken = await signToken(payload);
      //TODO : fix this after setting up the user controller
      // await this.usersService.updateUser(user.id, {
      //   lastLoginAt: new Date(Date.now()),
      // });
      return customResponse({
        success: true,
        status: HttpStatus.OK,
        data: { accessToken },
      });
    } catch (error) {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          errors: 'Could not log in! Try again later!',
        }),
      );
    }
  }

  async register(registerDto: RegisterDto): Promise<ICustomResponse> {
    const { email, password } = registerDto;

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.CONFLICT,
          success: false,
          errors: 'Email address is already taken by another user',
        }),
      );
    }

    try {
      //generate random handler for user
      const handleConfig = {
        count: 1,
        length: 8,
        prefix: `user`,
        charset: referalCode.charset('alphanumeric'),
      };

      const randomGeneratedHandler = referalCode.generate(handleConfig);

      //generate the referalCode for user
      const referalConfig = {
        count: 1,
        length: 8,
        prefix: `${email.charAt(0)}`,
        charset: referalCode.charset('alphanumeric'),
      };

      const randomGeneratedReferalCode = referalCode.generate(referalConfig);
      const hashedPassword = await hashPassword(password);
      const user: User = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          referalcode: `${randomGeneratedReferalCode}`,
          handle: `${randomGeneratedHandler}`,
          role: `USER`,
        },
      });

      const welcomeEmail = {
        to: email,
        subject: 'Welcome to Digital Thought! 🌟',
        body: newJoinedUser(randomGeneratedHandler),
      };

      this.emailService.send(welcomeEmail);

      return customResponse({
        success: true,
        status: HttpStatus.OK,
        data: user,
      });
    } catch (error) {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          errors: 'Could not register you on the platform',
        }),
      );
    }
  }
}
