import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../../../../modules/users/entities/user";
import { IUsersRepository } from "../../../../../modules/users/repo/users.repository";
import { UserDocument, UserMongo } from "../../schemas/users/user.schema";

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@InjectModel(UserMongo.name) private readonly userModel: Model<UserDocument>) {}

	public async findByEmail(email: string): Promise<User | null> {
		const userMongo = await this.userModel.findOne({ email: email }).exec();

		if (!userMongo) {
			return null;
		}

		return new User(userMongo.email, userMongo.password, userMongo.id);
	}

	public async save(user: Partial<User>): Promise<void> {
		const userMongo = new this.userModel({
			email: user.email,
			password: user.password,
			id: user.id,
		});

		await userMongo.save();
	}
}
