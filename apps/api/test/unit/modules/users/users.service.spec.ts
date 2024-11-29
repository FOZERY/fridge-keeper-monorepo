import { Test, TestingModule } from "@nestjs/testing";
import { UsersRepository } from "../../../../src/infrastructure/persistence/mongo/repo/users/users.repository";
import { User } from "../../../../src/modules/users/entities/user";
import { IUsersRepository } from "../../../../src/modules/users/repo/users.repository";
import { UsersService } from "../../../../src/modules/users/users.service";

class UsersMockRepository implements IUsersRepository {
	public users: Array<User> = [];

	async save(user: User): Promise<void> {
		this.users.push(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find((user) => user.email === email) ?? null;
	}
}

describe("UsersService", () => {
	let usersService: UsersService;
	let usersRepository: IUsersRepository;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: "UsersService",
					useFactory: (usersRepository) => new UsersService(usersRepository),
					inject: [UsersRepository],
				},
				{
					provide: "UsersRepository",
					useClass: UsersMockRepository,
				},
			],
		}).compile();

		usersService = module.get<UsersService>("UsersService");
		usersRepository = module.get<UsersRepository>("UsersRepository");
	});

	describe("createUser", () => {
		it("Should create user", async () => {
			await usersService.createUser({ email: "test@email.com", password: "password" });
		});
	});
});
