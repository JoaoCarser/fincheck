import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { bankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountRepo: bankAccountsRepository) {}
  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, color, type } = createBankAccountDto;

    const nameExists = await this.bankAccountRepo.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (nameExists) {
      throw new ConflictException('This BankAccount already exists');
    }

    return this.bankAccountRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return await this.bankAccountRepo.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { name, initialBalance, color, type } = updateBankAccountDto;

    const isOwner = await this.bankAccountRepo.findFirst({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('This BankAccount not found');
    }

    return this.bankAccountRepo.update({
      where: {id: bankAccountId},
      data: {
        name,
        initialBalance,
        color,
        type,
      }
    })
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
