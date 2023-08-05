import { createContext, useContext } from "react";
import { SettingsManager } from "../../features/settings/settings.js";
import { useVirtualRoot } from "../virtual-drive/VirtualRootContext.js";

const SettingsContext = createContext();

/**
 * Note: needs to be inside a virtual root provider
 * @returns {React.Provider<SettingsManager>}
 */
export function SettingsProvider({ children }) {
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
export function useSettings() {
	return useContext(SettingsContext);
}