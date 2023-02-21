module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest/globals": true 
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"overrides": [
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react", "jest"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off",
		"import/no-anonymous-default-export": "off"
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
}
