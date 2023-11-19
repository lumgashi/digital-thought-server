import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { prismaExclude, customResponse } from 'src/utils/functions';
import { GetUsersDto, CreateUserDto, UpdateUserDto } from './dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginate: PaginationService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(getUsers: GetUsersDto) {
    try {
      const { isActive, pagination, page, limit, email, role } = getUsers;

      const query = {
        email,
        role,
      };

      const users = await this.paginate.paginator<
        User,
        Prisma.UserWhereInput,
        Prisma.UserSelect,
        Prisma.UserInclude,
        | Prisma.UserOrderByWithRelationInput
        | Prisma.UserOrderByWithRelationInput[]
      >({
        paginate: { pagination, page, limit },
        model: this.prisma.user,
        condition: {
          where: {
            isActive,
            ...query,
          },
        },
        orderBy: [{ createdAt: 'asc' }],
      });

      return customResponse({
        success: true,
        status: HttpStatus.OK,
        data: users,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        customResponse({
          success: false,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: 'Could not get all users!',
        }),
      );
    }
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          errors: 'Could not find user with given id!',
        }),
      );
    }
    try {
      const updatePayload = {
        ...updateUserDto,
      };

      await this.prisma.user.update({
        where: { id },
        data: {
          ...updatePayload,
        },
      });

      return customResponse({
        success: true,
        status: HttpStatus.OK,
        data: 'User has been updated successfully!',
      });
    } catch (error) {
      throw new BadRequestException(
        customResponse({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          errors: 'Could not update user with given id!',
        }),
      );
    }
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
