import { FC, ReactNode } from "react";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { SettingsManagerContext } from "./settingsManagerContext";
import { SettingsManager } from "../../features";
import { useSingleton } from "../_utils";

export const SettingsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const virtualRoot = useVirtualRoot();
	if (virtualRoot == null) throw new Error("SettingsManager is missing VirtualRoot");
	const settingsManager = useSingleton(() => new SettingsManager(virtualRoot));

	return <SettingsManagerContext.Provider value={settingsManager}>
		{children}
	</SettingsManagerContext.Provider>;
};