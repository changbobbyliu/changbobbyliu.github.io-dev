import { TSideBarCategory, mockData, TPortfolioItem } from "@/config/mockdata";
import { ContentfulService } from "@/services/contentful";
import { FC, useMemo } from "react";
import { useQuery } from "react-query";
import { H1 } from "../components";

export const PortfolioScreen: FC<{ category: TSideBarCategory }> = ({ category }) => {
	const data = useMemo(() => {
		return mockData.portfolios.filter((item) => item.categories.includes(category));
	}, [category]);

	const { data: products, refetch } = useQuery("topicProductCollection", () =>
		ContentfulService.getInstance().get("topicProductCollection")
	);

	return (
		<div>
			<H1>
				Portfolio <span className="font-bold">(WIP)</span>
			</H1>
			<ul className="mx-2 mt-4">
				{data.map((item) => (
					<PortfolioItem item={item} />
				))}
			</ul>
			<p>{JSON.stringify(products, null, 2)}</p>
			<button onClick={() => refetch()}>Refetch</button>
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
