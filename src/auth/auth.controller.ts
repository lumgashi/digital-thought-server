import { Body, Controller, Post, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ICustomResponse } from 'src/utils/interfaces';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles the login operation.
   *
   * @param {LoginDto} body - The request body containing the email and password.
   * @returns {Promise<ICustomResponse>} - A promise representing the response of the login operation.
   */
  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<ICustomResponse> {
    return this.authService.login(email, password);
  }

  /**
   * Handles the registration of a user.
   * @param registerDto An object that represents the data needed for user registration.
   * @returns A promise that resolves to an `ICustomResponse` object.
   *
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ICustomResponse> {
    return this.authService.register(registerDto);
  }

  /**
   * Verifies a user's email address by the registration of a user.
   * @returns A promise that resolves to an `ICustomResponse` object.
   *
   */
  @Get('verify')
  async verify(@Req() req): Promise<ICustomResponse> {
    return this.authService.verify(req);
  }

  /**
   * Resends the verification email.
   * @returns A promise that resolves to an `ICustomResponse` object.
   *
   */
  @Post('resend-email-verification')
  async resendEmailVerification(userId: string): Promise<ICustomResponse> {
    return this.authService.resendEmailVerification(userId);
  }
}
