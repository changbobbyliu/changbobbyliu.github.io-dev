import { useGContext } from "@/managers/context/GContext";

import { LandingScreen } from "@/ui/screens/Landing.screen";
import { PortfolioScreen } from "../screens/Portfolio.screen";

export const MainContent = () => {
	const { sidebarActivePage } = useGContext();

	const mapCategoryToScreen = () => {
		switch (sidebarActivePage) {
			case "Landing":
				return <LandingScreen />;
			default:
				return <PortfolioScreen />;
		}
	};

	return (
		<div className="ml-16 min-h-screen bg-white transition-colors dark:bg-primary-100 dark:text-white px-2">
			{mapCategoryToScreen()}
		</div>
	);
};
