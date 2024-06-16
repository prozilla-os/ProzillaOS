import { createContext, useContext } from "react";
import { SystemManager } from "../../features/system/systemManager";

export const SystemManagerContext = createContext<SystemManager | undefined>(undefined);

export function useSystemManager(): SystemManager {
	return useContext(SystemManagerContext) as SystemManager;
}