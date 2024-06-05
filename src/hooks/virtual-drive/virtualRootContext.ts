import { createContext, useContext } from "react";
import { VirtualRoot } from "../../features/virtual-drive/root/virtualRoot";

export const VirtualRootContext = createContext<VirtualRoot | undefined>(undefined);

export function useVirtualRoot(): VirtualRoot {
	return useContext(VirtualRootContext);
}