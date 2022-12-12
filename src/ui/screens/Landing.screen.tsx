import { mockData } from "@/config/mockdata";
import { ContentfulService } from "@/services/contentful";
import { H1 } from "../components";
import avatarURI from "@/assets/images/avatar.jpeg";
import { useQuery } from "react-query";

export const LandingScreen = () => {
	const { data, error, isError, isLoading } = useQuery("topicProductCollection", () =>
		ContentfulService.getInstance().get("topicProductCollection")
	);

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
			<div className="space-x-3 mt-8 mb-16">
				{mockData.socials.map(({ icon, url, tintClassName = "" }) => (
					<a href={url} target="_blank">
						<i className={`iconfont ${icon} text-4xl ${tintClassName}`}></i>
					</a>
				))}
			</div>

			<H1 containerClassName="mb-4">📚 My Topics</H1>

			{/* TODO: add skeleton loading */}
			{isLoading && <div className="text-gray-500">Loading...</div>}

			{isError && <div className="text-red-500">{`Error: ${error}`}</div>}

			<div className="mx-8 mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
				{data &&
					data.map((item) => {
						return (
							<div
								key={item.sys.id}
								className="bg-gray-200/75 dark:bg-primary/50 flex flex-col rounded-lg shadow-lg transition-all cursor-pointer hover:brightness-105 hover:-translate-y-[1px] overflow-hidden"
							>
								<img className="my-1 object-contain h-3/4" src={item.featuredImage.url} />
								<p className="mb-2 text-center">{item.name}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
};
