import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(findManyArgs: Prisma.UserFindManyArgs) {
    return await this.prismaService.user.findMany(findManyArgs);
  }

  async findByEmail(findUnique: Prisma.UserFindUniqueArgs) {
    return await this.prismaService.user.findUnique(findUnique);
  }

  async getById(findUnique: Prisma.UserFindUniqueArgs) {
    return await this.prismaService.user.findUnique(findUnique);
  }

  async create(createDto: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(createDto);
  }
}
