import { H1 } from "@/ui/components";
import { memo, useEffect, useState } from "react";
import * as esbuild from "esbuild-wasm";

let isEsbuildReady = false;

const startService = async (onError?: (error: Error) => void) => {
	if (isEsbuildReady) return true;
	console.log("isEsbuildReady", isEsbuildReady);
	await esbuild
		.initialize({
			wasmURL: "/esbuild.wasm",
			worker: true,
		})
		.then(() => {
			isEsbuildReady = true;
		})
		.catch((error) => {
			onError?.(error);
		});
	return isEsbuildReady;
};

const useInitEsbuild = (onError?: (error: Error) => void) => {
	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		startService(onError).then(setIsReady);
	}, [onError]);
	return isReady;
};

export const TestEsbuildSection = memo<{ containerClassName?: string }>(
	({ containerClassName = "" }) => {
		const isReady = useInitEsbuild((error) => {
			console.log("useInitEsbuild.error", error);
		});
		return (
			<div className={`flex flex-col items-center w-full ${containerClassName}`}>
				<H1 containerClassName="mb-8">Esbuild IDE</H1>
				<div className="w-full flex flex-col">
					<textarea className="w-full bg-slate-900 rounded-md p-2 mb-2"></textarea>
					<button disabled={!isReady} className="rounded-lg bg-accent p-2 self-end">
						Compile
					</button>
				</div>
			</div>
		);
	}
);

// export const TestEsbuildSection: FC<{ containerClassName?: string }> = ({
// 	containerClassName = "",
// }) => {

// };
