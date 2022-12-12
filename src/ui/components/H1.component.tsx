import { FC, PropsWithChildren } from "react";

export const H1: FC<PropsWithChildren<{ containerClassName?: string }>> = ({
	containerClassName = "",
	children,
}) => {
	return (
		<h1 className={`text-xl font-semibold uppercase font-mono ${containerClassName}`}>
			{children}
		</h1>
	);
};
