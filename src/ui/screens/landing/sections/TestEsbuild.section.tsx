import { H1 } from "@/ui/components";
import { memo, useRef, useState } from "react";
import { EsbuildService } from "@/services/esbuild";

/**
 * const App = () => <div>APP</div>;
 */
export const TestEsbuildSection = memo<{ containerClassName?: string }>(
	({ containerClassName = "" }) => {
		const inputRef = useRef<HTMLTextAreaElement>(null);
		const [code, setCode] = useState("");
		const [isReady, setIsReady] = useState(true);

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
							try {
								setIsReady(false);
								const result = await EsbuildService.transform(inputText || "");
								if (!result) throw new Error("No result");
								setCode(result.code);
							} catch (error) {
								// TODO: handle error
								console.log("error", error);
							} finally {
								setIsReady(true);
							}
						}}
					>
						Compile
					</button>
					<p className="w-full bg-slate-800 font-mono rounded-md p-2 min-h-[4rem]">{code}</p>
				</div>
			</div>
		);
	}
);
