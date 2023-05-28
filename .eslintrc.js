module.exports = {
	'env': {
		'browser': true,
		'es2022': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'next',
		'prettier',
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 2022,
		'sourceType': 'module',
	},
	'plugins': [
		'@typescript-eslint/eslint-plugin',
		'simple-import-sort',
	],
	'ignorePatterns': [
		'dist/**/*.ts',
	],
	'rules': {
		'@typescript-eslint/adjacent-overload-signatures': ['error'],
		'@typescript-eslint/default-param-last': ['error'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': ['error', {
			'ignoreParameters': true,
			'ignoreProperties': true,
		}],
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'comma-dangle': 'off',
		'default-param-last': 'off',
		'no-unused-vars': 'off',
		'linebreak-style': ['error', 'unix'],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
}
