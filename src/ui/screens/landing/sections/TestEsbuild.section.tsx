import { H1 } from "@/ui/components";
import { memo, useEffect, useRef, useState } from "react";
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

/**
 * const App = () => <div>APP</div>;
 */
export const TestEsbuildSection = memo<{ containerClassName?: string }>(
	({ containerClassName = "" }) => {
		const inputRef = useRef<HTMLTextAreaElement>(null);
		const [code, setCode] = useState("");
		const isReady = useInitEsbuild((error) => {
			console.log("useInitEsbuild.error", error);
		});
		return (
			<div className={`flex flex-col items-center w-full ${containerClassName}`}>
				<H1 containerClassName="mb-8">Esbuild IDE</H1>
				<div className="w-full flex flex-col">
					<textarea ref={inputRef} className="w-full bg-slate-900 rounded-md p-2 mb-2"></textarea>
					<button
						disabled={!isReady}
						className="rounded-lg bg-accent p-2 self-end disabled:bg-gray-400 disabled:text-gray-300 mb-2"
						onClick={async () => {
							const inputText = inputRef.current?.value;
							esbuild
								.transform(inputText || "", {
									loader: "jsx",
									target: "es2015",
								})
								.then((result) => {
									setCode(result.code);
								});
						}}
					>
						Compile
					</button>
					<p className="w-full bg-slate-800 font-mono rounded-md p-2">{code}</p>
				</div>
			</div>
		);
	}
);

// export const TestEsbuildSection: FC<{ containerClassName?: string }> = ({
// 	containerClassName = "",
// }) => {

// };
