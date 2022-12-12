import { SideBar } from "@/ui/sidebar/SideBar";
import { GProvider } from "@/managers/context/GContext";
import { MainContent } from "@/ui/main-content/MainContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="top-right" />
			<GProvider>
				<div>
					<SideBar />
					<MainContent />
				</div>
			</GProvider>
		</QueryClientProvider>
	);
}

export default App;
