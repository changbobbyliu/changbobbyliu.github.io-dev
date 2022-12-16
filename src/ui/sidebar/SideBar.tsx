import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch.component";
import styles from "./SideBar.module.css";

type TProps = {
	activeCategory: string;
	setActiveCategory: Dispatch<SetStateAction<string>>;
	categories: string[];
};

export const SideBar: FC<TProps> = ({ categories, activeCategory, setActiveCategory }) => {
	return (
		<div className="bg-gray-100 dark:bg-primary text-white fixed top-0 left-0 h-screen w-16 flex flex-col items-center py-4 space-y-4 shadow-lg transition-colors">
			{categories.map((category) => (
				<SideBarItem
					key={category}
					category={category}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
			))}
			<div className="flex flex-1 flex-col justify-end">
				<DarkModeSwitch />
			</div>
		</div>
	);
};

const categoryToIconMap: Record<string, NSChangGlobal.TIconName> = {
	App: "icComputerTablet",
	Backend: "icDatabase",
	Game: "icGameFill",
	Landing: "icTreeRound",
	Web3: "icEthereum",
};

const SideBarItem: FC<{
	category: string;
	activeCategory: string;
	setActiveCategory: Dispatch<SetStateAction<string>>;
}> = ({ category, activeCategory, setActiveCategory }) => {
	const isActive = useMemo(() => activeCategory === category, [category, activeCategory]);
	const icon = useMemo(() => categoryToIconMap[category] || "icTreeRound", [category]);

	return (
		<div
			className={`${styles["item-container"]} group ${isActive ? "bg-green-700 rounded-xl" : ""}`}
			onClick={() => {
				setActiveCategory(category);
			}}
		>
			<i className={`iconfont ${icon} text-4xl`}></i>
			<span className={`${styles["item-tooltip"]} group-hover:scale-100`}>{`💡 ${category}`}</span>
		</div>
	);
};
