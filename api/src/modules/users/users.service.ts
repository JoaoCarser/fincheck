import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

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
    const user = await this.usersRepo.findById({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepo.delete({
      where: {
        id: userId,
      },
    });
  }
}
