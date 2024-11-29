import { UserRegisterDTO as IUserRegisterDTO } from "@libs/dto";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export default class UserRegisterDTO implements IUserRegisterDTO {
	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Invalid email address" })
	public email!: string;

	@IsNotEmpty({ message: "Password is required" })
	@IsString()
	@MinLength(6, { message: "Password must be at least 6 characters long" })
	public password!: string;
}
