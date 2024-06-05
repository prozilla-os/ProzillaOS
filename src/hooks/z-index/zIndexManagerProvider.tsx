import { FC, ReactNode } from "react";
import { ZIndexManager } from "../../features/z-index/zIndexManager";
import { ZIndexManagerContext } from "./zIndexManagerContext";

export const ZIndexManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const zIndexManager = new ZIndexManager();

	return <ZIndexManagerContext.Provider value={zIndexManager}>
		{children}
	</ZIndexManagerContext.Provider>;
};