import { H1 } from "@/ui/components";
import { memo, useEffect, useRef, useState } from "react";
import { EsbuildService } from "@/services/esbuild";

// TODO: remove this after testing
const initialInput = `import 'bulma/css/bulma.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
const App = () => <div>Hello, APP!</div>;
ReactDOM.createRoot(document.getElementById("root")).render(<App />);`;

const iframeHtml = `<html lang="en">
<head></head>
<body>
	<div id="root"></div>
	<script>
		window.addEventListener("message", ({data}) => {
			try {
				eval(data);
			} catch (error) {
				const root = document.getElementById("root");
				root.innerHTML = \`<div style="color: red;"><h4>Runtime Error:</h4>\${error}</div>\`
				console.error(error);
			}
		}, false);
	</script>
</body>
</html>`;

export const TestEsbuildSection = memo<{ containerClassName?: string }>(
	({ containerClassName = "" }) => {
		const inputRef = useRef<HTMLTextAreaElement>(null);
		const iframeRef = useRef<HTMLIFrameElement>(null);
		const [isReady, setIsReady] = useState(true);

		useEffect(() => {
			if (inputRef.current) inputRef.current.value = initialInput;
		}, []);

		return (
			<div className={`flex flex-col items-center w-full ${containerClassName}`}>
				<H1 containerClassName="mb-8">Esbuild IDE</H1>
				<div className="w-full flex flex-col">
					<textarea
						ref={inputRef}
						className="w-full bg-gray-100 dark:bg-primary rounded-sm p-2 mb-2"
					></textarea>
					<button
						disabled={!isReady}
						className="rounded-md bg-accent p-2 self-end disabled:bg-gray-400 disabled:text-gray-300 mb-2"
						onClick={async () => {
							if (!iframeRef.current) throw new Error("No iframe");
							iframeRef.current.srcdoc = iframeHtml; // reset iframe

							const inputText = inputRef.current?.value;
							try {
								setIsReady(false);
								const result = await EsbuildService.build(inputText || "");
								if (!result) throw new Error("No result");
								iframeRef.current?.contentWindow?.postMessage(
									result.outputFiles?.[0].text || "",
									"*"
								);
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
					<iframe
						ref={iframeRef}
						title="preview"
						srcDoc={iframeHtml}
						className="bg-gray-100 dark:bg-primary rounded-sm border-2"
					/>
				</div>
			</div>
		);
	}
);
