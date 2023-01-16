import esbuild, { OnLoadResult } from "esbuild-wasm";
import { C } from "@/config/constants";

export const fetchPlugin = (inputCode: string): esbuild.Plugin => ({
	name: "fetch-plugin",
	setup(build: esbuild.PluginBuild) {
		// 8. overide the default onLoad to return the contents of the file
		// 9. if import -> run onResolve again
		build.onLoad({ filter: /.*/ }, async (args) => {
			if (args.path === "index.js")
				return {
					loader: "jsx",
					// 10. Possible to specify version, like react@16.0.0
					contents: inputCode,
				};

			// 11. Check if file is in cache
			const cachedResult = await C.fileCache.getItem<OnLoadResult>(args.path);
			if (cachedResult) return cachedResult;

			// 12. Fetch the file from unpkg
			const resData = await fetch(args.path);
			const result: OnLoadResult = {
				loader: "jsx",
				contents: await resData.text(),
				resolveDir: new URL("./", resData.url).pathname,
			};
			await C.fileCache.setItem(args.path, result);
			return result;
		});
	},
});
