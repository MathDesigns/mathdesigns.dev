import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		rules: {
			// Removed invalid rules that do not exist in eslint-plugin-svelte v3+
			// 'svelte/a11y-no-static-element-interactions': 'error',
			// 'svelte/a11y-click-events-have-key-events': 'error',

			// Security: Enforce rel="noopener noreferrer" on target="_blank"
			'svelte/no-target-blank': 'error',

			'@typescript-eslint/no-explicit-any': 'error',
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
