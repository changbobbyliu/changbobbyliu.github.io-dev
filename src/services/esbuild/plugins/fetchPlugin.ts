import esbuild, { OnLoadResult } from "esbuild-wasm";
import { C } from "@/config/constants";

export const fetchPlugin = (inputCode: string): esbuild.Plugin => ({
	name: "fetch-plugin",
	setup(build: esbuild.PluginBuild) {
		// 1. onLoad added order matters!
		build.onLoad({ filter: /^index\.js$/ }, () => ({
			loader: "jsx",
			// 10. Possible to specify version, like react@16.0.0
			contents: inputCode,
		}));

		build.onLoad({ filter: /.*/ }, async (args) => {
			// 11. Check if file is in cache
			const cachedResult = await C.fileCache.getItem<OnLoadResult>(args.path);
			if (cachedResult) return cachedResult;
			// 11. move to next onLoad till return is not undefined/null/etc
		});

		// handle css
		build.onLoad({ filter: /\.css$/ }, async (args) => {
			const resData = await fetch(args.path);
			const contents = await resData
				.text()
				.then((rawText) => rawText.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'"))
				.then(
					(escaped) =>
						`const style = document.createElement('style');style.innerText = '${escaped}';document.head.appendChild(style);`
				);
			const result: OnLoadResult = {
				loader: "jsx",
				contents,
				resolveDir: new URL("./", resData.url).pathname,
			};
			await C.fileCache.setItem(args.path, result);
			return result;
		});

		// 9. if import -> run onResolve again
		build.onLoad({ filter: /.*/ }, async (args) => {
			// 12. Fetch the file from unpkg
			const resData = await fetch(args.path);
			const contents = await resData.text();
			const result: OnLoadResult = {
				loader: "jsx",
				contents,
				resolveDir: new URL("./", resData.url).pathname,
			};
			await C.fileCache.setItem(args.path, result);
			return result;
		});
	},
});
