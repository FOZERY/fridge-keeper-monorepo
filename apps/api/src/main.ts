import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";

async function start() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	const logger = app.get(Logger);
	const configService = app.get(ConfigService);

	app.useLogger(logger);

	const PORT = configService.get<number>("API_PORT") || 4000;

	await app
		.listen(PORT)
		.then(() => logger.log(`Server started on port: ${configService.get<number>("API_PORT")}`));
}
void start();
