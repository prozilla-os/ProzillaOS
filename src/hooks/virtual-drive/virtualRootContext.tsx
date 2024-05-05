import React, { createContext, useContext, FC, ReactNode } from "react";
import { VirtualRoot } from "../../features/virtual-drive/root/virtualRoot.js";

const VirtualRootContext = createContext<VirtualRoot | undefined>(undefined);

export const VirtualRootProvider: FC<{ children: ReactNode }> = ({ children }) =>  {
	const virtualRoot = new VirtualRoot().init();

	return <VirtualRootContext.Provider value={virtualRoot}>
		{children}
	</VirtualRootContext.Provider>;
};

/**
 * @returns {VirtualRoot}
 */
export function useVirtualRoot() {
	return useContext(VirtualRootContext);
}