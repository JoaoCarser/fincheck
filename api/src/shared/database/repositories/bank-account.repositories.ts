import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // HOUVE A TIPAGEM DESSA MANEIRA PARA QUE NO BANKACCOUNT SERVICE 
  // PARA QUE PUDESSE RECONHECER O TRANSACTIONS
  async findMany<T extends Prisma.BankAccountFindManyArgs>(findManyArgs: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>) {
    return await this.prismaService.bankAccount.findMany(findManyArgs);
  }

  async findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return await this.prismaService.bankAccount.findFirst(findFirstDto);
  }

  async create(createDto: Prisma.BankAccountCreateArgs) {
    return await this.prismaService.bankAccount.create(createDto);
  }

  async update(updateDto: Prisma.BankAccountUpdateArgs) {
    return await this.prismaService.bankAccount.update(updateDto);
  }

  async delete(deleteDto: Prisma.BankAccountDeleteArgs) {
    return await this.prismaService.bankAccount.delete(deleteDto);
  }
}
