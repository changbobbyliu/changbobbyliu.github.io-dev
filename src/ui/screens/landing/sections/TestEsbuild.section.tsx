import { H1 } from "@/ui/components";
import { FC } from "react";

export const TestEsbuildSection: FC<{ containerClassName?: string }> = ({
	containerClassName = "",
}) => {
	return (
		<div className={`${containerClassName}`}>
			<H1>Esbuild IDE</H1>
		</div>
	);
};
