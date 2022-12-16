const iconNames = [
	"icEdit",
	"icTree",
	"icLeaf",
	"icTreeRound",
	"icEthereum",
	"icComputerTablet",
	"icCopyleft",
	"iciOS",
	"icAndroid",
	"icExpand",
	"icGithub",
	"icTwitter",
	"icLinkedin",
	"icBrowser",
	"icGameFill",
	"icDatabase",
] as const;

// vite build --mode staging
const envModes = ["development", "production", "staging"] as const;

export const C = {
	iconNames,
	env: {
		modes: envModes,
		isIn: (env: typeof envModes[number]) => import.meta.env.MODE === env,
		contentful: {
			spaceID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
			cdaToken: import.meta.env.VITE_CONTENTFUL_CDA_TOKEN,
			cpaToken: import.meta.env.VITE_CONTENTFUL_CPA_TOKEN,
		},
	},
	navigation: {
		landing: "Landing",
	},
};
