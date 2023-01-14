import avatarURI from "@/assets/images/avatar.jpeg";
import { H1 } from "@/ui/components";
import { mockData } from "@/config/mockdata";
import { FC } from "react";

const renderSocialLinks = () => {
	return (
		<div className="space-x-3 mt-8">
			{mockData.socials.map(({ icon, url, tintClassName = "" }) => (
				<a key={url} href={url} target="_blank">
					<i className={`iconfont ${icon} text-4xl ${tintClassName}`}></i>
				</a>
			))}
		</div>
	);
};

export const SelfIntroSection: FC<{ containerClassName?: string }> = ({
	containerClassName = "",
}) => {
	return (
		<div className={`flex flex-col items-center ${containerClassName}`}>
			<img src={avatarURI} className="rounded-full w-48" />
			<H1 containerClassName="mt-4">👋 Hello, Friend (v0.0.2)</H1>
			<p className="text-center mt-6 max-w-md">
				I'm Chang, a software engineer from China. I'm currently working at{" "}
				<a
					href="https://daily-harvest.com/r/RE-2V6LLKB"
					target="_blank"
					rel="noreferrer"
					className="underline font-mono underline-offset-4 text-accent hover:brightness-110"
				>
					DAILY HARVEST
				</a>{" "}
				as a software engineer.
			</p>
			{renderSocialLinks()}
		</div>
	);
};
