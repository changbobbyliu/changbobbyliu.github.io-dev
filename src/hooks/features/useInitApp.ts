import { useState, useEffect } from "react";
import { ContentfulService } from "@/services/contentful";
import { C } from "@/config/constants";

export const useInitApp = () => {
	const [isInit, setIsInit] = useState(false);

	useEffect(() => {
		(async () => {
			ContentfulService.init(C.env.contentful);
			setIsInit(true);
		})();
	}, []);

	return isInit;
};
