import nextConfig from "eslint-config-next/core-web-vitals";

export default [
	...nextConfig,
	{
		rules: {
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/purity": "off",
			"react-hooks/refs": "off",
			"react-hooks/immutability": "off",
			"react/no-unescaped-entities": "off",
		},
	},
];