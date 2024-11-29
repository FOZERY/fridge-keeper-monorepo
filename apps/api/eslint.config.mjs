// @ts-check

import eslintJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintTs from "typescript-eslint";

import globals from "globals";

export default eslintTs.config(
	eslintJs.configs.recommended,
	...eslintTs.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},
	},
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			"prettier/prettier": ["error", {}, { config: "../../.prettierrc" }],
		},
	},
	{ files: ["**/*.ts"] },
	{ ignores: ["node_modules", "dist"] },
	{
		rules: {
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
	}
);
