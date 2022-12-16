import { FC } from "react";
import { useQuery } from "react-query";
import { mockData } from "@/config/mockdata";
import { ContentfulService } from "@/services/contentful";
import { H1 } from "../components";
import avatarURI from "@/assets/images/avatar.jpeg";

export const LandingScreen = () => {
	const { data, error, isError, isLoading } = useQuery("topicProductCollection", () =>
		ContentfulService.getInstance().getTopicProductCollection()
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
					<a key={url} href={url} target="_blank">
						<i className={`iconfont ${icon} text-4xl ${tintClassName}`}></i>
					</a>
				))}
			</div>

			<H1 containerClassName="mb-4">{`📚 My Topics (${import.meta.env.VITE_INIT_ADMIN_USER})`}</H1>

			{isError ? (
				<div className="text-red-500">{`Error: ${error}`}</div>
			) : (
				<div className="mx-8 mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
					{isLoading && <SkeletonLoading />}
					{data && data.map((item) => <MyTopicListItem key={item.sys.id} item={item} />)}
				</div>
			)}
		</div>
	);
};

const MyTopicListItem: FC<{ item: NSDTO.TMyTopic }> = ({ item }) => {
	return (
		<div
			key={item.sys.id}
			className="bg-gray-200/75 dark:bg-primary/50 flex flex-col rounded-lg shadow-lg transition-all cursor-pointer hover:brightness-105 hover:scale-105 overflow-hidden"
		>
			<img className="my-1 object-contain h-3/4" src={item.featuredImage.url} />
			<p className="mb-2 text-center">{item.name}</p>
		</div>
	);
};

const SkeletonLoading = () => {
	return (
		<>
			{[1, 2, 3].map((item) => {
				return (
					<div
						key={item}
						className="bg-gray-200/75 dark:bg-primary/50 flex flex-col items-center rounded-lg overflow-hidden animate-pulse"
					>
						<div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 mb-4">
							<svg
								className="w-12 h-12 text-gray-200"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 640 512"
							>
								<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
							</svg>
						</div>
						<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mx-2"></div>
						<span className="sr-only">Loading</span>
					</div>
				);
			})}
		</>
	);
};
