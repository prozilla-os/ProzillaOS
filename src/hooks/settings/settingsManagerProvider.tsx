import { FC, ReactNode } from "react";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { SettingsManager } from "../../features/settings/settingsManager";
import { SettingsManagerContext } from "./settingsManagerContext";

/**
 * Note: needs to be inside a virtual root provider
 */
export const SettingsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const virtualRoot = useVirtualRoot();
	const settingsManager = new SettingsManager(virtualRoot);

	return (
		<SettingsManagerContext.Provider value={settingsManager}>
			{children}
		</SettingsManagerContext.Provider>
	);
};