import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
	controllers: [ UsersController ],
	providers: [ UsersService ]
})
export class UsersModule {}
