import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import crypto from "node:crypto";
import { User } from "../users/entities/user.js";
import { UsersService } from "../users/users.service.js";
import { default as UserLoginDTO, default as UserRegisterDTO } from "./dto/user-login.dto.js";

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService) {}

	async register(dto: UserRegisterDTO) {
		const userCandidate = await this.userService.findByEmail(dto.email);

		if (userCandidate) {
			throw new ConflictException("Пользователь с таким email уже существует.");
		}

		await this.userService.createUser(dto);
	}

	async login(dto: UserLoginDTO) {
		const user: User | null = await this.userService.findByEmail(dto.email);

		if (!user || !(await user.verifyPassword(dto.password))) {
			throw new ForbiddenException("Неправильный пароль или email");
		}

		// TODO: JWT
		return {
			id: user.id,
			email: user.email,
			fridges_ids: user.fridges_ids,
		};
	}
}
