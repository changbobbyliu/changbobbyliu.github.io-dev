import { useDarkMode } from "@/hooks/useDarkMode";

export const DarkModeSwitch = () => {
	const [darkMode, setDarkMode] = useDarkMode();

	return (
		<div
			className=" text-2xl rounded-full w-12 h-12 hover:brightness-105 cursor-pointer overflow-hidden"
			onClick={() => {
				if (typeof setDarkMode !== "boolean") {
					setDarkMode(!darkMode);
				}
			}}
		>
			<div
				className={`bg-red-500 relative transition-transform ${darkMode ? "" : "-translate-x-12"}`}
			>
				<span className="text-2xl w-12 h-12 bg-primary-100 absolute top-0 left-0 flex justify-center items-center">
					🌛
				</span>
				<span className="text-2xl w-12 h-12 bg-white absolute top-0 left-12 flex justify-center items-center">
					🌞
				</span>
			</div>
		</div>
	);
};
