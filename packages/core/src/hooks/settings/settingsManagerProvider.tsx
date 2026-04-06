import { FC, ReactNode } from "react";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";
import { SettingsManagerContext } from "./settingsManagerContext";
import { SettingsManager } from "../../features";
import { useLazyRef } from "../_utils";

export const SettingsManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const virtualRoot = useVirtualRoot();
	if (virtualRoot == null) throw new Error("SettingsManager is missing VirtualRoot");
	const settingsManagerRef = useLazyRef(() => new SettingsManager(virtualRoot));

	return <SettingsManagerContext.Provider value={settingsManagerRef.current}>
		{children}
	</SettingsManagerContext.Provider>;
};