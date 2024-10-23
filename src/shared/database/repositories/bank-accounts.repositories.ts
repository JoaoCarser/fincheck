import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class bankAccountsRepository {
  constructor(private readonly prismService: PrismaService) {}

  async findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
    return await this.prismService.bankAccount.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return await this.prismService.bankAccount.findFirst(findFirstDto);
  }
  async create(createDto: Prisma.BankAccountCreateArgs) {
    return await this.prismService.bankAccount.create(createDto);
  }

  async update(updateDto: Prisma.BankAccountUpdateArgs) {
    return await this.prismService.bankAccount.update(updateDto);
  }
}
