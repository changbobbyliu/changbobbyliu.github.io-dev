import { useState, useEffect } from "react";

/**
 * From: https://usehooks.com/useMedia
 * @param queries ex: ["(min-width: 1500px)", "(min-width: 1000px)"]
 * @param values ex: [5,4], 5 for 1500px, 4 for 1000px
 * @param defaultValue
 * @returns
 */
export function useMedia<T>(queries: string[], values: T[], defaultValue: T) {
	const mediaQueryLists = queries.map((q) => window.matchMedia(q));

	const getValue = () => {
		const index = mediaQueryLists.findIndex((mql) => mql.matches);
		return typeof values[index] !== "undefined" ? values[index] : defaultValue;
	};

	const [value, setValue] = useState(getValue);
	useEffect(() => {
		const handler = () => setValue(getValue);
		mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));
		return () => mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler));
	}, []);

	return value;
}
