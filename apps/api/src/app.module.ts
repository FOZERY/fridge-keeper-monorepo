import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import path from "path";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.resolve(__dirname, "../../../", "env", ".development.env"),
			isGlobal: true,
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				transport: {
					target: "pino-pretty",
					options: {
						singleLine: true,
					},
				},
			},
		}),
		InfrastructureModule,
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
