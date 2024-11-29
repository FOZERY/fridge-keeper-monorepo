import crypto from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(crypto.scrypt);

export class PasswordVerifyError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class User {
	private _email: string;
	private _password: string;
	private _fridges_ids: Array<string> = [];

	private _id?: string;

	// TODO: mb make validator?
	constructor(email: string, password: string, id?: string) {
		if (!email || !password) {
			throw new Error("Error validating user");
		}

		this._email = email;
		this._password = password;

		this._id = id;
	}

	get password(): string {
		return this._password;
	}

	set password(password: string) {
		this._password = password;
	}

	get email(): string {
		return this._email;
	}

	get id(): string | undefined {
		return this._id;
	}

	get fridges_ids(): Array<string> {
		return this._fridges_ids;
	}

	public async hashPassword(): Promise<void> {
		const salt = crypto.randomBytes(16).toString("hex");
		const keyLength = 64;

		const derivedKey = (await scryptAsync(this._password, salt, keyLength)) as Buffer;

		this._password = `${salt}:${derivedKey.toString("hex")}`;
	}

	public async verifyPassword(password: string): Promise<boolean> {
		if (!this._password.includes(":")) {
			throw new PasswordVerifyError("User object has invalid password format");
		}

		const [salt, storedHash] = this._password.split(":");
		const keyLength = 64;

		const derivedKey = (await scryptAsync(password, salt, keyLength)) as Buffer;

		return storedHash === derivedKey.toString("hex");
	}
}
