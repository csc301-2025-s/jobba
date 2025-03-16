module.exports = {
	// $schema: "https://json.schemastore.org/eslintrc.json",
	env: {
		browser: false,
		es2021: true,
		node: true
	},
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:@next/next/recommended"
	],
	ignores: ["node_modules/", "dist/"],
	plugins: ["react", "unused-imports", "import", "@typescript-eslint", "jsx-a11y"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: "module"
	},
	settings: {
		react: {
			version: "detect"
		}
	},
	rules: {
		"no-console": "warn",
		"react/prop-types": "off",
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react-hooks/exhaustive-deps": "off",
		"jsx-a11y/click-events-have-key-events": "warn",
		"jsx-a11y/interactive-supports-focus": "warn",
		"no-unused-vars": "off",
		"unused-imports/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "warn",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				args: "after-used",
				ignoreRestSiblings: false,
				argsIgnorePattern: "^_.*?$"
			}
		],
		"import/order": [
			"warn",
			{
				groups: ["type", "builtin", "object", "external", "internal", "parent", "sibling", "index"],
				pathGroups: [
					{
						pattern: "~/**",
						group: "external",
						position: "after"
					}
				],
				"newlines-between": "always"
			}
		],
		"react/self-closing-comp": "warn",
		"react/jsx-sort-props": [
			"warn",
			{
				callbacksLast: true,
				shorthandFirst: true,
				noSortAlphabetically: false,
				reservedFirst: true
			}
		]
	}
};
