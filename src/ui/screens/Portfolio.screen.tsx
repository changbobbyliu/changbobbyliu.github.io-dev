import { useGContext } from "@/managers/context/GContext";
import { ContentfulService } from "@/services/contentful";
import { FC, useMemo } from "react";
import { useQuery } from "react-query";
import { H1 } from "../components";

export const PortfolioScreen: FC = () => {
	const { sidebarActivePage } = useGContext();
	const { data } = useQuery("portfolios", () => ContentfulService.getInstance().getPortfolio(), {
		staleTime: 24 * 3_600_000, // 1 day
	});

	const itemsForActiveCategory = useMemo(() => {
		return data?.portfolios.filter((item) => {
			return item.categoriesCollection.items.some((value) => value.name === sidebarActivePage);
		});
	}, [data, sidebarActivePage]);

	return (
		<div>
			<H1 containerClassName="text-center py-8">{sidebarActivePage}</H1>

			{itemsForActiveCategory?.length ? (
				<ul className="mx-2 mt-4">
					{itemsForActiveCategory.map((item) => (
						<PortfolioItem key={item.sys.id} item={item} />
					))}
				</ul>
			) : (
				<p className="text-center">No items found</p>
			)}
		</div>
	);
};

const PortfolioItem: FC<{ item: NSDTO.TPortfolio }> = ({ item: { name, url } }) => {
	return (
		<li>
			👉{" "}
			<a href={url} target="_blank" className="underline">
				{name}
			</a>
		</li>
	);
};
