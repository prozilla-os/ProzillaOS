import { createContext, useContext } from "react";
import Modal from "../../features/modals/modal";

export type ModalsState = Modal[] | undefined;

export const ModalsContext = createContext<ModalsState>(undefined);

export function useModals(): ModalsState {
	return useContext(ModalsContext);
}