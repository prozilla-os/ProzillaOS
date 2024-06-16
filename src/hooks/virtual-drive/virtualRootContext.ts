import { createContext, useContext } from "react";
import { VirtualRoot } from "../../features/virtual-drive/root/virtualRoot";

type VirtualRootState = VirtualRoot | undefined;

export const VirtualRootContext = createContext<VirtualRootState>(undefined);

export function useVirtualRoot(): VirtualRootState {
	return useContext(VirtualRootContext);
}