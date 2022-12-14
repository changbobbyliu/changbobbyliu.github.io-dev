/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_INIT_ADMIN_USER: string;
	readonly VITE_CONTENTFUL_SPACE_ID: string;
	readonly VITE_CONTENTFUL_CDA_TOKEN: string;
	readonly VITE_CONTENTFUL_CPA_TOKEN: string;
}

declare namespace NSChangGlobal {
	type TIconName = typeof import("@/config/constants").C.iconNames[number];
	type TContentfulCallConfig = { isPreview?: boolean; env?: "master" | "dev"; delay?: number };
}

declare namespace NSDTO {
	type TMyTopic = { sys: { id: string }; name: string; featuredImage: { url: string } };

	type TPortfolioCategory = { name: string };

	type TPortfolio = {
		sys: { id: string };
		name: string;
		description: string;
		techs: string[];
		url: string;
		previewImage: { url: string };
		categoriesCollection: { items: TPortfolioCategory[] };
	};
}
