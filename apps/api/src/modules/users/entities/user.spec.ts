import { PasswordVerifyError, User } from "./user";

describe("User", () => {
	describe("hashPassword", () => {
		it("Должен правильно шифровать и дешифровать пароль", async () => {
			const user = new User("some@email.com", "testpassword");

			await user.hashPassword();

			expect(user.verifyPassword("testpassword")).toBeTruthy();
		});

		it("Должен выводить ошибку при сравнении, если захэшированный пароль не соответствует формату salt:hash", async () => {
			const user = new User("some@email.com", "testpassword");

			await expect(user.verifyPassword("testpassword")).rejects.toThrow(PasswordVerifyError);
		});
	});
});
