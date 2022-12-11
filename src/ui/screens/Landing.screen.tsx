import { C } from "@/config/constants";
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
			{C.env.isIn("development") && <pre>{JSON.stringify(import.meta.env, null, 2)}</pre>}
			{C.env.isIn("development") && (
				<p className="mx-16 break-all text-lg">{JSON.stringify(data)}</p>
			)}
		</div>
	);
};
