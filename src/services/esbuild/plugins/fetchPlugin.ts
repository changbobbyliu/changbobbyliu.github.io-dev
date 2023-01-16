import esbuild, { OnLoadResult } from "esbuild-wasm";
import { C } from "@/config/constants";

const isCss = (path: string) => path.endsWith(".css");
async function getContent(path: string, resData: Response) {
	const resText = await resData.text();
	if (isCss(path)) {
		const escaped = resText.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'");
		return `const style = document.createElement('style');style.innerText = '${escaped}';document.head.appendChild(style);`;
	}
	return resText;
}

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

			const resData = await fetch(args.path);
			const contents = await getContent(args.path, resData);

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
