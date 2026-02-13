import { createContext, useContext } from "react";
import { SystemManager } from "../../features/system/systemManager";

export const SystemManagerContext = createContext<SystemManager | undefined>(undefined);

export function useSystemManager(): SystemManager {
	const systemManager = useContext(SystemManagerContext);

	if (systemManager == null)
		throw new Error("SystemManager is missing");

	return systemManager;
}

export function useStorage() {
	const systemManager = useSystemManager();
	return systemManager.storage;
}

export function useSkin() {
	const systemManager = useSystemManager();
	return systemManager.skin;
}