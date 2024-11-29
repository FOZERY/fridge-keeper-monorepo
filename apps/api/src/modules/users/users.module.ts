import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [InfrastructureModule],
	controllers: [UserController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UserModule {}
