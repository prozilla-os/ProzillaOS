import { FC, ReactNode } from "react";
import { ZIndexManagerContext } from "./zIndexManagerContext";
import { ZIndexManager } from "../../features";

export const ZIndexManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const zIndexManager = new ZIndexManager();

	return <ZIndexManagerContext.Provider value={zIndexManager}>
		{children}
	</ZIndexManagerContext.Provider>;
};