import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailExist = await this.usersRepo.findByEmail({
      where: { email },
      select: { id: true },
    });

    if (emailExist) {
      throw new ConflictException('This email already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async findAll() {
    return await this.usersRepo.findAll({});
  }

  async findOne(userId: string) {
    const user = await this.usersRepo.findById({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersRepo.findById({
      where: {
        id: userId,
      },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { email, name } = updateUserDto;

    const user = await this.usersRepo.findById({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersRepo.update({
      where: { id: userId },
      data: {
        email,
        name,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async remove(userId: string) {
    await this.usersRepo.delete({
      where: {
        id: userId,
      },
    });
  }
}
