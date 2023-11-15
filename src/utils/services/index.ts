import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
