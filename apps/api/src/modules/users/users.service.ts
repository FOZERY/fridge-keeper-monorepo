import { UserCreateDTO } from "@libs/dto";
import { Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "../../infrastructure/persistence/mongo/repo/users/users.repository";
import { User } from "./entities/user";
import { IUsersRepository } from "./repo/users.repository";

@Injectable()
export class UsersService {
	constructor(@Inject(UsersRepository) private readonly usersRepository: IUsersRepository) {}

	async createUser(dto: UserCreateDTO): Promise<void> {
		const user = new User(dto.email, dto.password);

		await user.hashPassword();

		await this.usersRepository.save(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.usersRepository.findByEmail(email);
	}
}
