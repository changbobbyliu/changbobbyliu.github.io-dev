import { useGContext } from "@/managers/context/GContext";
import { ContentfulService } from "@/services/contentful";
import { FC, useMemo } from "react";
import { H1 } from "../components";
import styles from "./Portfolio.module.css";

export const PortfolioScreen: FC = () => {
	const { sidebarActivePage } = useGContext();
	const { data } = ContentfulService.useGetPortfolioQuery();

	const itemsForActiveCategory = useMemo(() => {
		return data?.portfolioCollection.filter((item) => {
			return item.categoriesCollection.items.some((value) => value.name === sidebarActivePage);
		});
	}, [data, sidebarActivePage]);

	return (
		<div className="pb-8">
			<H1 containerClassName="text-center py-8">{sidebarActivePage}</H1>

			{itemsForActiveCategory?.length ? (
				<ul className="mx-2 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{itemsForActiveCategory.map((item) => (
						<PortfolioItem key={item.sys.id} item={item} />
					))}
				</ul>
			) : (
				<p className="text-center text-gray-400">No items found</p>
			)}
		</div>
	);
};

const PortfolioItem: FC<{ item: NSContentful.DTO.TPortfolio }> = ({ item }) => {
	const {
		name,
		description,
		techs,
		url,
		previewImage,
		categoriesCollection: { items: categories },
	} = item;

	return (
		<li
			className={`relative rounded-lg overflow-hidden bg-slate-600 text-white dark:bg-white dark:text-black group ${styles.hover}`}
		>
			<a href={url} target="_blank" className="flex flex-col">
				<div className="min-h-[120px] min-w-[200px] md:h-[220px] overflow-hidden">
					<img
						src={`${previewImage ? previewImage.url : "/img/portfolio-preview.jpeg"}`}
						className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="p-2">
					<h3 className="text-lg font-semibold">{name}</h3>
					<p className="text-sm mb-3">{description}</p>
					<div className="flex gap-2 flex-wrap">
						{[...categories.map((cat) => cat.name), ...techs].map((item) => {
							return (
								<span key={item} className="px-2 text-sm rounded-full bg-orange-300">
									{item}
								</span>
							);
						})}
					</div>
				</div>
			</a>
		</li>
	);
};
