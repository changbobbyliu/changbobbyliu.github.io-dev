import esbuild, { BuildOptions, TransformOptions } from "esbuild-wasm";
import { unpkgPathPlugin, fetchPlugin } from "./plugins";

const startService = async (onError?: (error: Error) => void) => {
	return esbuild
		.initialize({
			// TODO: validate this is the correct version in ci check
			wasmURL: "https://unpkg.com/esbuild-wasm@0.17.0/esbuild.wasm",
			worker: true,
		})
		.then(() => true)
		.catch((error) => {
			onError?.(error);
			return false;
		});
};

export class EsbuildService {
	static transform = async (
		input: string,
		options: TransformOptions = {
			loader: "jsx",
			target: "es2015",
		}
	) => {
		try {
			const result = await esbuild.transform(input || "", options);
			return result;
		} catch (error) {
			if (error instanceof Error && error.message.includes("initialize")) {
				await startService();
				return esbuild.transform(input || "", options);
			}
		}
	};

	static build = async (
		inputCode: string,
		options: BuildOptions = {
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(inputCode)],
			define: {
				// define works like macro defines
				global: "window",
			},
		}
	) => {
		try {
			return esbuild.build(options);
		} catch (error) {
			if (error instanceof Error && error.message.includes("initialize")) {
				await startService();
				return esbuild.build(options);
			}
		}
	};
}
