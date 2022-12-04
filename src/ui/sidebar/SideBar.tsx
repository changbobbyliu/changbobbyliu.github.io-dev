import { useDarkMode } from "@/hooks/useDarkMode";
import styles from "./SideBar.module.css";

export function SideBar() {
	const [darkMode, setDarkMode] = useDarkMode();
	return (
		<div className="bg-gray-100 dark:bg-primary text-white fixed top-0 left-0 h-screen w-16 flex flex-col items-center py-4 space-y-4 shadow-lg transition-colors">
			<SideBarItem icon="icTreeRound" tooltip="💡 LANDING" />
			<SideBarItem icon="icEthereum" tooltip="💡 WEB3" />
			<SideBarItem icon="icGameFill" tooltip="💡 GAME" />
			<SideBarItem icon="icDatabase" tooltip="💡 SERVER" />
			<SideBarItem icon="icComputerTablet" tooltip="💡 MOBILE" />
			<div className="flex flex-1 flex-col justify-end">
				<div
					className="text-2xl rounded-full bg-primary-100 w-12 h-12 flex justify-center items-center hover:brightness-105 cursor-pointer"
					onClick={() => {
						if (typeof setDarkMode === "boolean") {
						} else {
							setDarkMode(!darkMode);
						}
					}}
				>
					<span>{darkMode ? "🌛" : "🌞"}</span>
				</div>
			</div>
		</div>
	);
}

function SideBarItem({ icon, tooltip }: { icon: NSChangGlobal.TIconName; tooltip: string }) {
	return (
		<div className={`${styles["item-container"]} group`}>
			<i className={`iconfont ${icon} text-4xl`}></i>
			<span className={`${styles["item-tooltip"]} group-hover:scale-100`}>{tooltip}</span>
		</div>
	);
}
