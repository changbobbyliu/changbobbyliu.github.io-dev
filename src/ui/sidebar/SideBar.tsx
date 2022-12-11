import { mockData } from "@/config/mockdata";
import { useGContext } from "@/managers/context/GContext";
import { FC, useMemo } from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch.component";
import styles from "./SideBar.module.css";

export function SideBar() {
	return (
		<div className="bg-gray-100 dark:bg-primary text-white fixed top-0 left-0 h-screen w-16 flex flex-col items-center py-4 space-y-4 shadow-lg transition-colors">
			{mockData.sideBarCategories.map((category) => (
				<SideBarItem key={category} {...mockData.sideBarItems[category]} />
			))}
			<div className="flex flex-1 flex-col justify-end">
				<DarkModeSwitch />
			</div>
		</div>
	);
}

const SideBarItem: FC<{ icon: NSChangGlobal.TIconName; category: string }> = ({
	icon,
	category,
}) => {
	const { sidebarActivePage, setSidebarActivePage } = useGContext();
	const isActive = useMemo(() => sidebarActivePage === category, [category, sidebarActivePage]);

	return (
		<div
			className={`${styles["item-container"]} group ${isActive ? "bg-green-700 rounded-xl" : ""}`}
			onClick={() => {
				setSidebarActivePage(category);
			}}
		>
			<i className={`iconfont ${icon} text-4xl`}></i>
			<span className={`${styles["item-tooltip"]} group-hover:scale-100`}>{`💡 ${category}`}</span>
		</div>
	);
};
