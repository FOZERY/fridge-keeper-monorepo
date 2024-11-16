// @ts-check

import eslintJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import globals from "globals";
import eslintTs from "typescript-eslint";

// Определяем текущий каталог

export default eslintTs.config(
	eslintJs.configs.recommended,
	...eslintTs.configs.recommended,
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			"prettier/prettier": ["error", { singleQuote: false }, { usePrettierrc: true }],
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
			parserOptions: {
				project: [
					"./tsconfig.eslint.json",
					"./apps/*/tsconfig.json",
					"./libs/*/tsconfig.json",
				],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	}
);
