import { createContext, useContext } from "react";
import { ZIndexManager } from "../../features/z-index/zIndexManager.js";

const ZIndexManagerContext = createContext();

/**
 * @param {object} props
 * @param {import("react").ElementType} props.children
 * @returns {import("react").Provider<any>}
 */
export function ZIndexManagerProvider({ children }) {
	const zIndexManager = new ZIndexManager();

	return <ZIndexManagerContext.Provider value={zIndexManager}>
		{children}
	</ZIndexManagerContext.Provider>;
}

/**
 * @returns {ZIndexManager}
 */
export function useZIndexManager() {
	return useContext(ZIndexManagerContext);
}