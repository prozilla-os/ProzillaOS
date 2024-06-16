import { FC, ReactNode } from "react";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { SettingsManager } from "../../features/settings/settingsManager";
import { SettingsManagerContext } from "./settingsManagerContext";

export const SettingsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const virtualRoot = useVirtualRoot();
	if (virtualRoot == null) throw new Error("SettingsManager is missing VirtualRoot");
	const settingsManager = new SettingsManager(virtualRoot);

	return (
		<SettingsManagerContext.Provider value={settingsManager}>
			{children}
		</SettingsManagerContext.Provider>
	);
};