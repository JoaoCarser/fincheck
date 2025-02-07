import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';

// DatabaseModule CRIADO ATRAVES DA CLI PARA QUE A INJEÇÃO DE DEPENDENCIAS SEJA GLOBAL
@Global()
@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
