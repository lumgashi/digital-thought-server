import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Should return a user object with valid id
  it('should return a user object with valid id', async () => {
    const usersService = new UsersService(new PrismaService());
    const id = 'validId';
    const user = {
      id: 'validId',
      firstName: 'John Doe',
      email: 'johndoe@example.com',
    };
    jest
      .spyOn(usersService['prisma'].user, 'findUnique')
      .mockResolvedValue(user);

    const result = await usersService.findOne(id);

    expect(result).toEqual({
      success: true,
      status: HttpStatus.OK,
      data: user,
    });
  });
});
