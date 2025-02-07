import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';

@Module({
  imports: [
    JwtModule.register({
      global: true,

      // Utiliza o validator config/env.ts para validar e obter as variáveis de ambiente.
      secret: env.jwtSecret, 
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
