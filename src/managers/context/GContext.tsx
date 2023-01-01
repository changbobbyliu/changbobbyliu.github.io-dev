import { C } from "@/config/constants";
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

type TContext = {
	sidebarActivePage: string;
	setSidebarActivePage: Dispatch<SetStateAction<string>>;
	categories: string[];
};

const GContext = createContext<TContext>(undefined!);

export const GProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sidebarActivePage, setSidebarActivePage] = useState(C.navigation.landing);

	const { data: portfolioData } = ContentfulService.useGetPortfolioQuery();

	return (
		<GContext.Provider
			value={{
				sidebarActivePage,
				setSidebarActivePage,
				categories: portfolioData?.portfolioCategoryCollection.map((item) => item.name) || [],
			}}
		>
			{children}
		</GContext.Provider>
	);
};

export const useGContext = () => useContext(GContext);
