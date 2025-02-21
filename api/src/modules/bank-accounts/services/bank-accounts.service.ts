import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-account.repositories';
import { ValidateBankAccountOwnerShip } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnerShip: ValidateBankAccountOwnerShip,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return await this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccount = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            value: true,
            type: true,
          },
        },
      },
    });

    return bankAccount.map(({transactions, ...bankAccount}) => {

      const totalTransactions = transactions.reduce(
        (acc, transaction) => acc + (transaction.type === "INCOME" ? transaction.value :  - transaction.value),
        0,
      );


      const currentBalance = bankAccount.initialBalance + totalTransactions;


      return {
        totalTransactions,
        ...bankAccount,
        currentBalance,
        transactions, 
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;

    await this.validateBankAccountOwnerShip.validate(userId, bankAccountId);

    return await this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnerShip.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });
  }
}
