import { mockData, TPortfolioItem, TSideBarCategory } from "@/config/mockdata";
import { useGContext } from "@/managers/context/GContext";
import { FC, PropsWithChildren, useMemo } from "react";
import avatarURI from "@/assets/images/avatar.jpeg";

export const MainContent = () => {
	const { sidebarActivePage } = useGContext();

	const mapCategoryToScreen = () => {
		switch (sidebarActivePage) {
			case "landing":
				return <LandingScreen />;
			default:
				return <PortfolioScreen category={sidebarActivePage as TSideBarCategory} />;
		}
	};

	return (
		<div className="ml-16 min-h-screen bg-white transition-colors dark:bg-primary-100 dark:text-white px-2">
			{mapCategoryToScreen()}
		</div>
	);
};

const H1: FC<PropsWithChildren<{ containerClassName?: string }>> = ({
	containerClassName = "",
	children,
}) => {
	return <h1 className={`text-lg uppercase font-mono ${containerClassName}`}>{children}</h1>;
};

const LandingScreen = () => {
	return (
		<div className="flex flex-col items-center">
			<img src={avatarURI} className="rounded-full w-48 mt-24" />
			<H1 containerClassName="mt-4">👋 Hello, Friend!</H1>
			<p className="text-center mt-6 max-w-md">
				I'm Chang, a software engineer from China. I'm currently working at{" "}
				<a href="https://daily-harvest.com" target="_blank" rel="noreferrer">
					DAILY HARVEST
				</a>{" "}
				as a software engineer.
			</p>
			<div className="space-x-3 my-8">
				{mockData.socials.map(({ icon, url, tintClassName = "" }) => (
					<a href={url} target="_blank">
						<i className={`iconfont ${icon} text-4xl ${tintClassName}`}></i>
					</a>
				))}
			</div>
		</div>
	);
};

const PortfolioScreen: FC<{ category: TSideBarCategory }> = ({ category }) => {
	const data = useMemo(() => {
		return mockData.portfolios.filter((item) => item.categories.includes(category));
	}, [category]);

	return (
		<div>
			<H1>
				Portfolio <span className="font-bold">(WIP)</span>
				<ul className="mx-2 mt-4">
					{data.map((item) => (
						<PortfolioItem item={item} />
					))}
				</ul>
			</H1>
		</div>
	);
};

const PortfolioItem: FC<{ item: TPortfolioItem }> = ({ item: { title, url } }) => {
	return (
		<li>
			👉{" "}
			<a href={url} target="_blank" className="underline">
				{title}
			</a>
		</li>
	);
};
