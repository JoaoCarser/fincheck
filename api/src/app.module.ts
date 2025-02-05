import { Global, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './shared/database/database.module';

@Global()
@Module({
	imports: [ UsersModule, DatabaseModule ],
	controllers: [],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
	]
})
export class AppModule {}
