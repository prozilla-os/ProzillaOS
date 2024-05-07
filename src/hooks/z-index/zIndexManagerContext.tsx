import { createContext, FC, ReactNode, useContext } from "react";
import { ZIndexManager } from "../../features/z-index/zIndexManager";

type ZIndexManagerState = ZIndexManager | undefined;

const ZIndexManagerContext = createContext<ZIndexManagerState>(undefined);

export const ZIndexManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const zIndexManager = new ZIndexManager();

	return <ZIndexManagerContext.Provider value={zIndexManager}>
		{children}
	</ZIndexManagerContext.Provider>;
};

export function useZIndexManager(): ZIndexManagerState  {
	return useContext(ZIndexManagerContext);
}