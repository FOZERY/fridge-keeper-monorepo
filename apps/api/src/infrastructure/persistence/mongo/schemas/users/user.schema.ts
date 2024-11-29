import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { FridgeMongo } from "../fridges/fridge.schema";

export type UserDocument = HydratedDocument<UserMongo>;

@Schema({ collection: "users", timestamps: true })
export class UserMongo {
	@Prop({ required: true })
	public email!: string;

	@Prop({ required: true })
	public password!: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fridge" }] })
	public fridges!: FridgeMongo[];
}

export const UserMongoSchema = SchemaFactory.createForClass(UserMongo);
