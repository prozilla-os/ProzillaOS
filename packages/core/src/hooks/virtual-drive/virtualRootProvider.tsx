import { FC, ReactNode } from "react";
import { VirtualRootContext } from "./virtualRootContext";
import { VirtualRoot } from "../../features/virtual-drive/root/virtualRoot";
import { useSystemManager } from "../system/systemManagerContext";
import { useSingleton } from "../_utils";

export const VirtualRootProvider: FC<{ children: ReactNode }> = ({ children }) =>  {
	const systemManager = useSystemManager();
	const virtualRoot = useSingleton(() => new VirtualRoot(systemManager).init());

	return <VirtualRootContext.Provider value={virtualRoot}>
		{children}
	</VirtualRootContext.Provider>;
};