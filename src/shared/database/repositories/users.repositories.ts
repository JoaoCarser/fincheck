import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(createDto);
  }

  async findUnique(findUniqueDto : Prisma.UserFindUniqueArgs) {
    return await this.prismaService.user.findUnique(findUniqueDto);
  }
}
