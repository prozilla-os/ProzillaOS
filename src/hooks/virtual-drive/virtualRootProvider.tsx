import { FC, ReactNode } from "react";
import { VirtualRoot } from "../../features/virtual-drive/root/virtualRoot";
import { VirtualRootContext } from "./virtualRootContext";

export const VirtualRootProvider: FC<{ children: ReactNode }> = ({ children }) =>  {
	const virtualRoot = new VirtualRoot().init();

	return <VirtualRootContext.Provider value={virtualRoot}>
		{children}
	</VirtualRootContext.Provider>;
};