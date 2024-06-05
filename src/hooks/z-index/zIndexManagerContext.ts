import { createContext, useContext } from "react";
import { ZIndexManager } from "../../features/z-index/zIndexManager";

type ZIndexManagerState = ZIndexManager | undefined;

export const ZIndexManagerContext = createContext<ZIndexManagerState>(undefined);

export function useZIndexManager(): ZIndexManagerState  {
	return useContext(ZIndexManagerContext);
}