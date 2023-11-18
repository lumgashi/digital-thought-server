import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional({})
  @IsString({ message: 'handler should be string' })
  @IsNotEmpty({ message: 'handler cannot be empty' })
  @MinLength(5, { message: 'handler cannot be shorter than 5 characters' })
  handle?: string;

  @IsOptional({})
  @IsString({ message: 'firstName should be string' })
  @IsNotEmpty({ message: 'firstName cannot be empty' })
  firstName?: string;

  @IsOptional({})
  @IsString({ message: 'lastName should be string' })
  @IsNotEmpty({ message: 'lastName cannot be empty' })
  lastName?: string;

  @IsOptional({})
  @IsString({ message: 'phone number should be string' })
  @IsNotEmpty({ message: 'phone number cannot be empty' })
  phone?: string;
}
