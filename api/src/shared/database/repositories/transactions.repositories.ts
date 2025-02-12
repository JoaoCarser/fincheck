import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return await this.prismaService.transaction.findMany(findManyDto);
  }

  async findFirst(findFirst: Prisma.TransactionFindFirstArgs) {
    return await this.prismaService.transaction.findFirst(findFirst);
  }

  async create(createDto: Prisma.TransactionCreateArgs) {
    return await this.prismaService.transaction.create(createDto);
  }

  async update(updateDto: Prisma.TransactionUpdateArgs) {
    return await this.prismaService.transaction.update(updateDto);
  }

  async delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return await this.prismaService.transaction.delete(deleteDto);
  }

}
