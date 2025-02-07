import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	password: string;
}
