import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validade-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validade-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}
  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  // METODO PRIVADO PARA VALIDAR SE USUÁRIO É "DONO" DA BANK_ACCOUNT E DA CATEGORY
  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId: string;
    categoryId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
