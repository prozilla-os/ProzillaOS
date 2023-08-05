import { createContext, useContext } from "react";
import { VirtualRoot } from "../../features/virtual-drive/virtual-root.js";

const VirtualRootContext = createContext();

/**
 * @returns {React.Provider<VirtualRoot>}
 */
export function VirtualRootProvider({ children }) {
	const virtualRoot = new VirtualRoot().init();

	return (
		<VirtualRootContext.Provider value={virtualRoot}>
			{children}
		</VirtualRootContext.Provider>
	);
}

/**
 * @returns {VirtualRoot}
 */
export function useVirtualRoot() {
	return useContext(VirtualRootContext);
}