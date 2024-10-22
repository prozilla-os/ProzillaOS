// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				allowAutomaticSingleRunInference: true,
			},
		},
		ignores: [
			"eslint.config.js",
			"**/dist/**/*"
		],
		plugins: {
			"react": /** @type {import("eslint").ESLint.Plugin} */ (react),
			"react-refresh": reactRefresh,
		},
		rules: {
			"quotes": ["error", "double"],
			"no-unused-vars": "off",
			"indent": [
				"error",
				"tab",
				{
					"SwitchCase": 1
				}
			],
			"semi": "error",
			"no-var": "error",
			"prefer-const": "error",
			"object-curly-spacing": [
				"warn",
				"always"
			],
			"default-case": "off",
			"arrow-parens": "error",
			"space-infix-ops": "warn",
    		"comma-spacing": "warn",
			"comma-dangle": [
				"warn",
				{
					"arrays": "always-multiline",
					"objects": "always-multiline",
					"imports": "always-multiline",
					"exports": "always-multiline",
					"functions": "never"
				}
			],
			"keyword-spacing": "error",
			"react/no-multi-comp": [
				"error",
				{
					"ignoreStateless": true
				}
			],
			"react/no-invalid-html-attribute": "error",
			"react/boolean-prop-naming": "warn",
			"react/jsx-handler-names": "warn",
			"react-refresh/only-export-components": [
				"warn",
				{ "allowConstantExport": true }
			],
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					"args": "all",
					"argsIgnorePattern": "^_",
					"caughtErrors": "all",
					"caughtErrorsIgnorePattern": "^_",
					"destructuredArrayIgnorePattern": "^_",
					"varsIgnorePattern": "^_",
					"ignoreRestSiblings": true
				}
			],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "default",
					format: ["camelCase"],
					leadingUnderscore: "allow",
					trailingUnderscore: "allow",
				},
				{
					selector: "import",
					format: ["camelCase", "PascalCase"],
				},
				{
					// React components and Variables
					selector: "variable",
					format: ["camelCase", "UPPER_CASE", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					// Types and enum members
					selector: ["typeLike", "enumMember"],
					format: ["PascalCase"],
				},
				{
					// React components, functions and properties
					selector: [
						"function",
						"parameter",
						"classProperty",
						"objectLiteralProperty",
						"typeProperty",
						"classMethod",
						"objectLiteralMethod",
						"typeMethod",
						"accessor",
					],
					format: ["camelCase", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					// Static class fields
					selector: "classProperty",
					modifiers: ["static"],
					format: ["UPPER_CASE"],
				},
				{
					// Ignore destructured variables and parameters
					selector: ["variable", "parameter"],
					modifiers: ["destructured"],
					format: null,
				},
				{
					// Ignore properties that require quotes
					selector: [
						"classProperty",
						"objectLiteralProperty",
						"typeProperty",
						"classMethod",
						"objectLiteralMethod",
						"typeMethod",
						"accessor",
						"enumMember",
					],
					modifiers: ["requiresQuotes"],
					format: null,
				},
			],
			"@typescript-eslint/await-thenable": "off"
		},
	}
);