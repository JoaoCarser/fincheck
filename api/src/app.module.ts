import { Global, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { APP_PIPE } from '@nestjs/core';

@Global()
@Module({
	imports: [ UsersModule ],
	controllers: [],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe
		}
	]
})
export class AppModule {}
