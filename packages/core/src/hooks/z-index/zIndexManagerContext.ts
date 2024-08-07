import { createContext, useContext } from "react";
import { ZIndexManager } from "../../features";

type ZIndexManagerState = ZIndexManager | undefined;

export const ZIndexManagerContext = createContext<ZIndexManagerState>(undefined);

export function useZIndexManager(): ZIndexManagerState {
	return useContext(ZIndexManagerContext);
}