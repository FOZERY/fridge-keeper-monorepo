import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import UserLoginDTO from "./dto/user-login.dto";
import UserRegisterDTO from "./dto/user-register.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post("register")
	async register(@Body() dto: UserRegisterDTO) {
		await this.authService.register(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	async login(@Body() dto: UserLoginDTO) {
		return await this.authService.login(dto);
	}
}
