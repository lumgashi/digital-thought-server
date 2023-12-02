import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  customResponse,
  encodeJwt,
  hashPassword,
  matchPasswords,
  signToken,
} from 'src/utils/functions';
import { ICustomResponse } from 'src/utils/interfaces';
import { RegisterDto } from './dto';
import referalCode from 'src/utils/functions/referalCodeGenerator';
import { EmailService } from 'src/utils/services/email/email.service';
import { User } from '@prisma/client';
import { emailTemplateConfig } from 'src/utils/functions/email';
import { accountVerification } from 'src/utils/functions/email/emailTypes';
import { UserRole } from 'src/utils/types';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private config: ConfigService,
    private user: UsersService,
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

    //TODO : impletement npm deep-email-validator
    //https://soshace.com/verifying-an-email-address-without-sending-an-email-in-nodejs/?ref=dailydev

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
          role: UserRole.USER,
        },
      });
      const url = encodeJwt(user.id);

      const welcomeEmail = {
        to: email,
        subject: 'Digital-Thought - Activate Your Account',
        body: accountVerification(user.firstName, url),
        //templateId: emailTemplateConfig.WELCOME_USER,
      };

      // this.emailService.send(welcomeEmail);
      this.emailService.sendEmail(welcomeEmail);

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

  async verify(@Req() req): Promise<ICustomResponse> {
    //https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node
    const token = req.query.id;

    if (token) {
      try {
        jwt.verify(
          token,
          this.config.get('app.jwtSecret'),
          async (error, decoded) => {
            if (error) {
              console.log(error);
              //   return res.sendStatus(403);
              throw new BadRequestException(
                customResponse({
                  status: HttpStatus.FORBIDDEN,
                  success: false,
                  errors:
                    'Token has expired. Please request a new verification email.',
                }),
              );
            } else {
              const userId = decoded.id;

              // Check if the account has already been verified
              // Check the verification status in your database
              const user = await this.user.findOne(userId); // Replace with your database retrieval logic

              if (user.data.isActive)
                throw new BadRequestException(
                  customResponse({
                    status: HttpStatus.BAD_REQUEST,
                    success: false,
                    errors: 'Account already activated',
                  }),
                );

              // Send a response indicating successful verification
              return customResponse({
                success: true,
                status: HttpStatus.OK,
                data: 'Account successfully verified!',
              });
            }
          },
        );
      } catch (err) {
        console.log(err);
        throw new BadRequestException(
          customResponse({
            status: HttpStatus.BAD_REQUEST,
            success: false,
            errors: 'Something went wrong',
          }),
        );
      }
    } else {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.FORBIDDEN,
          success: false,
          errors: 'Something went wrong',
        }),
      );
    }

    return customResponse({
      success: true,
      status: HttpStatus.OK,
      data: 'User verified successfully!',
    });
  }

  async resendEmailVerification(userId: string): Promise<ICustomResponse> {
    const user = await this.user.findOne(userId);

    const url = encodeJwt(user.data.id);

    const resendEmail = {
      to: user.data.email,
      subject: 'Digital-Thought - Activate Your Account',
      body: accountVerification(user.data.firstName, url),
      //templateId: emailTemplateConfig.WELCOME_USER,
    };

    // this.emailService.send(welcomeEmail);
    this.emailService.sendEmail(resendEmail);

    return customResponse({
      success: true,
      status: HttpStatus.OK,
      data: 'An email has been sent to your email address to verify your account',
    });
  }
}
