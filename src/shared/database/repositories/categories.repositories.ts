import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return await this.prismaService.category.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return await this.prismaService.category.findFirst(findFirstDto);
  }
}
