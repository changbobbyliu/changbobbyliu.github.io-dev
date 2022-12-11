import { mockData } from "@/config/mockdata";
import { TGQL, ContentfulService } from "@/services/contentful";
import { useState, useEffect } from "react";
import { H1 } from "../components";
import avatarURI from "@/assets/images/avatar.jpeg";

export const LandingScreen = () => {
	const [data, setData] = useState<TGQL["topicProductCollection"]>([]);

	useEffect(() => {
		ContentfulService.getInstance()
			.get("topicProductCollection")
			.then((res) => {
				setData(res);
			})
			.catch((err) => {
				alert("Error: " + err.message || "Unknown error");
			});
	}, []);

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
			<div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3 mx-auto justify-center">
				{data.map((item) => {
					return (
						<div
							key={item.sys.id}
							className="bg-gray-100/80 max-w-[16rem] rounded-lg shadow-lg transition-all cursor-pointer hover:brightness-105 hover:-translate-y-[1px]"
						>
							<img className="my-1" src={item.featuredImage.url} />
							<p className="mb-2 text-center text-gray-900">{item.name}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
