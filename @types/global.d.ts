/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_INIT_ADMIN_USER: string;
}

declare namespace NSChangGlobal {
	type TIconName = typeof import("@/config/constants").C.iconNames[number];
}
