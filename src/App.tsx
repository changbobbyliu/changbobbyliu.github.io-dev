import { SideBar } from "@/ui/sidebar/SideBar";

function App() {
	return (
		<div>
			<SideBar />
			<div className="ml-16 flex justify-center items-center min-h-screen bg-white transition-colors dark:bg-primary-100 dark:text-white">
				<h1 className="text-lg uppercase font-mono">👋 Hello, Friend~</h1>
			</div>
		</div>
	);
}

export default App;
