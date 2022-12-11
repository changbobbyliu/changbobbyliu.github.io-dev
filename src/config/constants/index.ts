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
	},
};
