// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
				allowAutomaticSingleRunInference: true,
			},
		},
		ignores: [
			"eslint.config.js",
		],
		plugins: {
			react
		},
		rules: {
			"quotes": "off",
   			"@typescript-eslint/quotes": ["error", "double"],
			"no-unused-vars": "off",
			"@typescript-eslint/ban-types": "off",
			"indent": "off",
			"@typescript-eslint/indent": [
				"error",
				"tab",
				{
					"SwitchCase": 1
				}
			],
			"@typescript-eslint/semi": "error",
			"no-var": "error",
			"prefer-const": "error",
			"object-curly-spacing": "off",
			"@typescript-eslint/object-curly-spacing": [
				"warn",
				"always"
			],
			"default-case": "off",
			"arrow-parens": "error",
			"space-infix-ops": "off",
			"@typescript-eslint/space-infix-ops": "warn",
			"react/no-multi-comp": [
				"error",
				{
					"ignoreStateless": true
				}
			],
			"comma-spacing": "off",
    		"@typescript-eslint/comma-spacing": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					"argsIgnorePattern": "^_"
				}
			]
		},
	}
);