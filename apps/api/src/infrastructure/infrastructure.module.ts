import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersRepository } from "./persistence/mongo/repo/users/users.repository";
import { UserMongo, UserMongoSchema } from "./persistence/mongo/schemas/users/user.schema";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				console.log(configService.get<string>("MONGODB_URI"));
				return {
					uri: configService.get<string>("MONGODB_URI"),
				};
			},
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([{ name: UserMongo.name, schema: UserMongoSchema }]),
	],
	providers: [UsersRepository],
	exports: [UsersRepository],
})
export class InfrastructureModule {}
