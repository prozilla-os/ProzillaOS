import { createContext, useContext } from "react";
import { SystemManager } from "../../features/system/systemManager";

export const SystemManagerContext = createContext<SystemManager | undefined>(undefined);

export function useSystemManager(): SystemManager {
	const systemManager = useContext(SystemManagerContext);

	if (systemManager == null)
		throw new Error("SystemManager is missing");

	return systemManager;
}