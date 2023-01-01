import { SideBar } from "@/ui/sidebar/SideBar";
import { GProvider, useGContext } from "@/managers/context/GContext";
import { MainContent } from "@/ui/main-content/MainContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { C } from "./config/constants";
import { useInitApp } from "./hooks/features/useInitApp";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 900_000, // Infinity
		},
	},
});

function App() {
	const isInit = useInitApp();
	if (!isInit) return null;
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="top-right" />
			<GProvider>
				<AppUI />
			</GProvider>
		</QueryClientProvider>
	);
}

function AppUI() {
	const { sidebarActivePage, setSidebarActivePage, categories } = useGContext();
	return (
		<div>
			<SideBar
				categories={[C.navigation.landing, ...categories]}
				activeCategory={sidebarActivePage}
				setActiveCategory={setSidebarActivePage}
			/>
			<MainContent />
		</div>
	);
}

export default App;
