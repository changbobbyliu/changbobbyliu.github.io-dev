export type TSideBarCategory = typeof sideBarCategories[number];

type TSideBarItem = {
	category: TSideBarCategory;
	description: string;
	icon: NSChangGlobal.TIconName;
};

const sideBarCategories = ["landing", "web3", "game", "server", "mobile"] as const;
const sideBarItems: { [key: string]: TSideBarItem } = {
	landing: {
		category: "landing",
		description: "Landing Page",
		icon: "icTreeRound",
	},
	web3: {
		category: "web3",
		description: "Web3 Page",
		icon: "icEthereum",
	},
	game: {
		category: "game",
		description: "Game Page",
		icon: "icGameFill",
	},
	server: {
		category: "server",
		description: "Server Page",
		icon: "icDatabase",
	},
	mobile: {
		category: "mobile",
		description: "Mobile Page",
		icon: "icComputerTablet",
	},
};

const socials: { icon: NSChangGlobal.TIconName; tintClassName?: string; url: string }[] = [
	{ icon: "icGithub", url: "https://github.com/changbobbyliu" },
	{ icon: "icTwitter", tintClassName: "text-sky-400", url: "https://twitter.com/changisadev" },
	{
		icon: "icLinkedin",
		tintClassName: "text-blue-600",
		url: "https://www.linkedin.com/in/bobbychangliu",
	},
];

const techstacks = [
	"React",
	"React Native",
	"JavaScript/TypeScript",
	"Android/Java/Kotlin",
	"iOS/Swift/Objective-C",
	"Nextjs",
	"Solidity",
	"Cocos Creator",
] as const;
type TTechstack = typeof techstacks[number];

export type TPortfolioItem = {
	title: string;
	description: string;
	url: string;
	categories: TSideBarCategory[];
	techstacks: TTechstack[];
};
const portfolios: TPortfolioItem[] = [
	{
		title: "A Web3 GameFi Dapp",
		description: "A Web3 GameFi Dapp",
		url: "https://changliu.is-a.dev/bs-game-front",
		categories: ["web3", "game"],
		techstacks: ["React", "Solidity"],
	},
	{
		title: "A Web3 ENS Dapp",
		description: "A Web3 ENS Dapp",
		url: "https://changliu.is-a.dev/bs-ens-front",
		categories: ["web3"],
		techstacks: ["React", "Solidity"],
	},
	{
		title: "A Web3 DAO Dapp",
		description: "A Web3 DAO Dapp",
		url: "https://changliu.is-a.dev/bs-dao",
		categories: ["web3"],
		techstacks: ["React", "Solidity"],
	},
	{
		title: "A Cocos Game",
		description: "A Cocos Game",
		url: "https://chang.is-a.dev/dh_hack2022",
		categories: ["game"],
		techstacks: ["Cocos Creator"],
	},
];

export const mockData = {
	sideBarCategories,
	sideBarItems,
	socials,
	portfolios,
};
