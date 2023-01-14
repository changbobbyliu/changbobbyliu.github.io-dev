import esbuild, { BuildOptions, TransformOptions } from "esbuild-wasm";
import { unpkgPathPlugin } from "./unpkgPathPlugin";

const startService = async (onError?: (error: Error) => void) => {
	return esbuild
		.initialize({
			wasmURL: "/esbuild.wasm",
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
		options: BuildOptions = {
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()],
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
