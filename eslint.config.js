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
			// @ts-ignore
			react,
			"react-refresh": reactRefresh,
		},
		rules: {
			"quotes": ["error", "double"],
			"no-unused-vars": "off",
			"@typescript-eslint/ban-types": "off",
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
			"react/no-multi-comp": [
				"error",
				{
					"ignoreStateless": true
				}
			],
    		"comma-spacing": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					"argsIgnorePattern": "^_"
				}
			],
			"react-refresh/only-export-components": [
				"warn",
				{ "allowConstantExport": true }
			],
			"@typescript-eslint/await-thenable": "off",
			"react/boolean-prop-naming": "warn",
			"react/jsx-handler-names": "warn",
			"comma-dangle": ["warn", "always-multiline"],
			"space-before-keywords": "error",
			"react/no-invalid-html-attribute": "error",
		},
	}
);