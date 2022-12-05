type TSideBarCategory = typeof sideBarCategories[number];

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

export const mockData = {
	sideBarCategories,
	sideBarItems,
};
