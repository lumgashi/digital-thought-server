import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { prismaExclude, customResponse } from 'src/utils/functions';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: prismaExclude('User', ['password', 'passwordResetToken']),
      });

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
          errors: 'Could not find user with given id!',
        }),
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      await this.prisma.user.update({
        where: { id },
        data: {
          isActive: false,
        },
      });

      return customResponse({
        success: true,
        status: HttpStatus.OK,
        data: 'User deleted successfully!',
      });
    } catch (error) {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          errors: 'Could not delete user with given id!',
        }),
      );
    }
  }
}
