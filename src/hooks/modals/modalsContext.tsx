import React, { createContext, FC, ReactNode, useCallback, useContext, useState } from "react";
import Modal from "../../features/modals/modal.js";
import ModalsManager from "../../features/modals/modalsManager.js";

type ModalsState = Modal[] | undefined;

const ModalsContext = createContext<ModalsState>(undefined);

export const ModalsProvider: FC<{ children: ReactNode, modalsManager: ModalsManager }> = ({ children, modalsManager }) => {
	const [modals, setModals] = useState<ModalsState>([]);

	const updateModals = useCallback((updatedModals: Record<string, Modal>) => {
		setModals(Object.values(updatedModals));
	}, []);

	modalsManager.setUpdateModals(updateModals);

	return (
		<ModalsContext.Provider value={modals}>
			{children}
		</ModalsContext.Provider>
	);
};

export function useModals(): ModalsState {
	return useContext(ModalsContext);
}