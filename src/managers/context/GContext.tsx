import { ContentfulService } from "@/services/contentful";
import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { useQuery } from "react-query";

type TContext = {
	sidebarActivePage: string;
	setSidebarActivePage: Dispatch<SetStateAction<string>>;
	categories: string[];
};

const GContext = createContext<TContext>(undefined!);

export const GProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sidebarActivePage, setSidebarActivePage] = useState("Landing");

	const { data: portfolioData } = useQuery(
		"portfolios",
		() => ContentfulService.getInstance().getPortfolio(),
		{ staleTime: 24 * 3_600_000 }
	);

	return (
		<GContext.Provider
			value={{
				sidebarActivePage,
				setSidebarActivePage,
				categories: portfolioData?.portfolioCategories.map((item) => item.name) || [],
			}}
		>
			{children}
		</GContext.Provider>
	);
};

export const useGContext = () => useContext(GContext);
