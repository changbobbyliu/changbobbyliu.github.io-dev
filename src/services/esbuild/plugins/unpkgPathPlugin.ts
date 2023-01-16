import { Plugin } from "esbuild-wasm";

export const unpkgPathPlugin = (): Plugin => ({
	name: "unpkg-path-plugin",
	setup(build) {
		// 1. onResolve to figure out where the file is
		// 3. filter for filename
		// 4. namepsace -> another way to filter
		build.onResolve({ filter: /(^index\.js$)/ }, (args) => ({ path: args.path, namespace: "a" }));
		// 2. handle relative paths in a module
		build.onResolve({ filter: /^\.+\// }, (args) => ({
			// 5. // + "/" required to make .. work
			// 7. resolveDir -> path of dir the importing file is in, like /src
			path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
			namespace: "a",
		}));
		// 8. handle main file of a module
		build.onResolve({ filter: /.*/ }, async (args) => ({
			namespace: "a",
			path: `https://unpkg.com/${args.path}`,
		}));
	},
});
