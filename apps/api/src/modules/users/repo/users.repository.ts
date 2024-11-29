import { User } from "../entities/user.js";

export interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
	save(user: Partial<User>): Promise<void>;
}
