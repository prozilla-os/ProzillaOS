import { createContext, useContext } from "react";
import { SettingsManager } from "../../features/settings/settingsManager.js";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext.js";

const SettingsContext = createContext();

/**
 * Note: needs to be inside a virtual root provider
 * @param props
 * @param props.children
 * @returns {import("react").Provider<SettingsManager>}
 */
export function SettingsManagerProvider({ children }) {
	const virtualRoot = useVirtualRoot();
	const settingsManager = new SettingsManager(virtualRoot);

	return (
		<SettingsContext.Provider value={settingsManager}>
			{children}
		</SettingsContext.Provider>
	);
}

/**
 * @returns {SettingsManager}
 */
export function useSettingsManager() {
	return useContext(SettingsContext);
}