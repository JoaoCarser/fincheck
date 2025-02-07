import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    return { userId  };
  }

  async findAll() {
    return await this.usersRepo.findAll({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
