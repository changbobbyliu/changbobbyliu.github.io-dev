import { TSideBarCategory, mockData, TPortfolioItem } from "@/config/mockdata";
import { FC, useMemo } from "react";
import { H1 } from "../components";

export const PortfolioScreen: FC<{ category: TSideBarCategory }> = ({ category }) => {
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
