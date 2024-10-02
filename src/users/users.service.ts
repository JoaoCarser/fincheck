import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailExists = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (emailExists) {
      throw new ConflictException('Email already exists')
    }

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}
