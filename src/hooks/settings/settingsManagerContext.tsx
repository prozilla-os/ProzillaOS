import React, { createContext, FC, ReactNode, useContext } from "react";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { VirtualRoot } from "../../features/virtual-drive/root/virtualRoot.js";

type SettingsManagerState = SettingsManager | undefined;

const SettingsManagerContext = createContext<SettingsManagerState>(undefined);

/**
 * Note: needs to be inside a virtual root provider
 */
export const SettingsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const virtualRoot = useVirtualRoot();
	const settingsManager = new SettingsManager(virtualRoot as VirtualRoot);

	return (
		<SettingsManagerContext.Provider value={settingsManager}>
			{children}
		</SettingsManagerContext.Provider>
	);
};

export function useSettingsManager(): SettingsManagerState {
	return useContext(SettingsManagerContext);
}