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
};

const GContext = createContext<TContext>(undefined!);

export const GProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sidebarActivePage, setSidebarActivePage] = useState("landing");

	return (
		<GContext.Provider value={{ sidebarActivePage, setSidebarActivePage }}>
			{children}
		</GContext.Provider>
	);
};

export const useGContext = () => useContext(GContext);
