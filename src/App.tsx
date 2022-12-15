import { SideBar } from "@/ui/sidebar/SideBar";
import { GProvider, useGContext } from "@/managers/context/GContext";
import { MainContent } from "@/ui/main-content/MainContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 900_000, // Infinity
		},
	},
});

function App() {
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
				categories={["Landing", ...categories]}
				activeCategory={sidebarActivePage}
				setActiveCategory={setSidebarActivePage}
			/>
			<MainContent />
		</div>
	);
}

export default App;
