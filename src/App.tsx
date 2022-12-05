import { SideBar } from "@/ui/sidebar/SideBar";
import { GProvider } from "@/managers/context/GContext";
import { MainContent } from "@/ui/main-content/MainContent";

function App() {
	return (
		<GProvider>
			<div>
				<SideBar />
				<MainContent />
			</div>
		</GProvider>
	);
}

export default App;
