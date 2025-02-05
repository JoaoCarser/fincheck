import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(findUnique: Prisma.UserFindUniqueArgs) {
    return await this.prismaService.user.findUnique(findUnique);
  }

  async findById(findUnique: Prisma.UserFindUniqueArgs) {
    return await this.prismaService.user.findUnique(findUnique);
  }

  async findAll(findAll: Prisma.UserFindManyArgs) {
    return await this.prismaService.user.findMany(findAll);
  }

  async create(createDto: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(createDto);
  }

  async update(updateDto: Prisma.UserUpdateArgs) {
    return await this.prismaService.user.update(updateDto);
  }

  async delete(deleteDto: Prisma.UserDeleteArgs) {
    return await this.prismaService.user.delete(deleteDto);
  }
}
