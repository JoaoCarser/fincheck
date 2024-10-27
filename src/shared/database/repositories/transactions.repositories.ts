import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismService: PrismaService) {}

  async findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return await this.prismService.transaction.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return await this.prismService.transaction.findFirst(findFirstDto);
  }
  async create(createDto: Prisma.TransactionCreateArgs) {
    return await this.prismService.transaction.create(createDto);
  }

  async update(updateDto: Prisma.TransactionUpdateArgs) {
    return await this.prismService.transaction.update(updateDto);
  }

  async delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return await this.prismService.transaction.delete(deleteDto);
  }
}
