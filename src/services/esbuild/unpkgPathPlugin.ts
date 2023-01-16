import { C } from "@/config/constants";
import { OnLoadArgs, OnLoadResult, OnResolveArgs, PluginBuild } from "esbuild-wasm";

export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: "unpkg-path-plugin",
		setup(build: PluginBuild) {
			// 1. onResolve to figure out where the file is
			build.onResolve({ filter: /.*/ }, async (args: OnResolveArgs) => {
				console.log("onResole", args);
				if (args.path === "index.js") {
					return { path: args.path, namespace: "a" };
				} else if (args.path.includes("./") || args.path.includes("../")) {
					// 2. locate imports from imports
					// 3. filter for filename
					// 4. namepsace -> another way to filter
					return {
						namespace: "a",
						// 5. // + "/" required to make .. work
						// 6. importer -> path of file that is importing
						// 7. resolveDir -> path of dir the importing file is in
						path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
					};
				}
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`,
				};
			});

			// 8. overide the default onLoad to return the contents of the file
			// 9. if import -> run onResolve again
			build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
				console.log("onLoad", args);

				if (args.path === "index.js") {
					return {
						loader: "jsx",
						// 10. Possible to specify version, like react@16.0.0
						contents: inputCode,
					};
				}

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
	};
};
