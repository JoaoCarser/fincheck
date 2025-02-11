import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(findManyDto: Prisma.CategoryFindManyArgs) {
    return await this.prismaService.category.findMany(findManyDto);
  }
}
