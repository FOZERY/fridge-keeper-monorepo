import * as crypto from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(crypto.scrypt);

export class PasswordVerifyError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.randomBytes(16).toString("hex");
	const keyLength = 64;

	const derivedKey = (await scryptAsync(password, salt, keyLength)) as Buffer;

	return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
	if (!storedHash.includes(":")) {
		throw new PasswordVerifyError("User object has invalid password format");
	}

	const [salt, derivedHash] = storedHash.split(":");
	const keyLength = 64;

	const derivedKey = (await scryptAsync(password, salt, keyLength)) as Buffer;

	return derivedHash === derivedKey.toString("hex");
}
